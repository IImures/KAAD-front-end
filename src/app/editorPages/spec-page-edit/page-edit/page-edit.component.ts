import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewEncapsulation
} from '@angular/core';
import {SpecializationDetails} from "../../../interfaces/specialization-details";
import {SpecializationService} from "../../../services/specialization.service";
import {ActivatedRoute, Router} from "@angular/router";
import {isPlatformBrowser, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LanguageDetails} from "../../../interfaces/language-details";
import {LanguageService} from "../../../services/language.service";
import {environment} from "../../../../environments/environment";
import {SpecializationPageDetails} from "../../../interfaces/specialization-page-details";

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
  type EditorConfig,
  ClassicEditor,
  Autoformat,
  AutoImage,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  CloudServices,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Mention,
  Paragraph,
  PasteFromOffice,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline
} from 'ckeditor5';
import {SpecPageRequest} from "../../../interfaces/SpecPageRequest";

const LICENSE_KEY = 'GPL';


@Component({
  selector: 'app-page-edit',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    NgOptimizedImage,
    CKEditorModule,
    FormsModule
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './page-edit.component.html',
  styleUrl: './page-edit.component.scss'
})
export class PageEditComponent implements OnInit, AfterViewInit {

  specId!: string;
  specialization!: SpecializationDetails;
  specPageExists: boolean = false;
  specializationPage: SpecPageRequest = {
    pageContents :[
      {
        content : '',
        code : 'page',
        languageId: '',
        isLabel: false
      }
    ]
  };
  languages!: LanguageDetails[];
  selectedLanguage!: LanguageDetails | null;
  selectedImage: File | null = null;
  imagePreview: string | null = null;

  public isLayoutReady = false;
  public Editor = ClassicEditor;
  public config: EditorConfig = {};

  imageExists: boolean = true;

  constructor(
    private specializationService: SpecializationService,
    private languageService: LanguageService,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private router : Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.specId = params['id'];
      this.loadSpecialization(this.specId);
    });

    this.languageService.getLanguages().subscribe(
      languages => {
        this.languages = languages;
      }
    );


  }

  private loadSpecialization(id : string) {
    this.specializationService.getSpecialization(id).subscribe(
      specialization => {
        this.specialization = specialization;
      }
    );
  }

  private loadSpecializationPage() {
    if(!this.selectedLanguage) return;
    console.log(this.selectedLanguage);
    this.specializationService.getSpecializationPage(this.specId, this.selectedLanguage.code).subscribe(
      {
        next: specialization => {
          this.specializationPage.pageContents[0].languageId = this.selectedLanguage!.id;
          this.specPageExists = true;

          if(specialization.generalInfo.language.code == this.selectedLanguage!.code) {
            this.specializationPage.pageContents[0].content = specialization.generalInfo.content;
          }else{
            this.specializationPage.pageContents[0].content = '';
          }
        },
        error: error => {
          if(error.status == 404) {
            this.specPageExists = false;
          }else {
            this.specPageExists = true;
          }
          this.specializationPage.pageContents[0].languageId = this.selectedLanguage!.id;
          this.specializationPage.pageContents[0].content = '';
        }
      }
    );
  }


  selectLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedId = selectElement.value;

    this.selectedLanguage = this.languages.find(
      (language) => language.id == selectedId
    ) || null;

    if(!this.selectedLanguage) return;

    this.loadSpecializationPage();
  }

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      if (file.type.startsWith('image/')) {
        this.selectedImage = file;

        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file');
        fileInput.value = '';
      }
    }
  }

  onImageError() {
    this.imageExists = false;
  }

  public ngAfterViewInit(): void {
    this.config = {
      toolbar: {
        items: [
          'heading',
          '|',
          'fontSize',
          'fontFamily',
          'fontColor',
          'fontBackgroundColor',
          '|',
          'bold',
          'italic',
          'underline',
          '|',
          'specialCharacters',
          'link',
          'mediaEmbed',
          'insertTable',
          'blockQuote',
          '|',
          'bulletedList',
          'numberedList',
          'todoList',
          'outdent',
          'indent'
        ],
        shouldNotGroupWhenFull: false
      },
      plugins: [
        Autoformat,
        AutoImage,
        Autosave,
        BalloonToolbar,
        BlockQuote,
        Bold,
        CloudServices,
        Essentials,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        Heading,
        ImageBlock,
        ImageCaption,
        ImageInline,
        ImageInsertViaUrl,
        ImageResize,
        ImageStyle,
        ImageTextAlternative,
        ImageToolbar,
        ImageUpload,
        Indent,
        IndentBlock,
        Italic,
        Link,
        LinkImage,
        List,
        ListProperties,
        MediaEmbed,
        Mention,
        Paragraph,
        PasteFromOffice,
        SpecialCharacters,
        SpecialCharactersArrows,
        SpecialCharactersCurrency,
        SpecialCharactersEssentials,
        SpecialCharactersLatin,
        SpecialCharactersMathematical,
        SpecialCharactersText,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TextTransformation,
        TodoList,
        Underline
      ],
      balloonToolbar: ['bold', 'italic', '|', 'link', '|', 'bulletedList', 'numberedList'],
      fontFamily: {
        supportAllValues: true
      },
      fontSize: {
        options: [10, 12, 14, 'default', 18, 20, 22],
        supportAllValues: true
      },
      heading: {
        options: [
          {
            model: 'paragraph',
            title: 'Paragraph',
            class: 'ck-heading_paragraph'
          },
          {
            model: 'heading1',
            view: 'h1',
            title: 'Heading 1',
            class: 'ck-heading_heading1'
          },
          {
            model: 'heading2',
            view: 'h2',
            title: 'Heading 2',
            class: 'ck-heading_heading2'
          },
          {
            model: 'heading3',
            view: 'h3',
            title: 'Heading 3',
            class: 'ck-heading_heading3'
          },
          {
            model: 'heading4',
            view: 'h4',
            title: 'Heading 4',
            class: 'ck-heading_heading4'
          },
          {
            model: 'heading5',
            view: 'h5',
            title: 'Heading 5',
            class: 'ck-heading_heading5'
          },
          {
            model: 'heading6',
            view: 'h6',
            title: 'Heading 6',
            class: 'ck-heading_heading6'
          }
        ]
      },
      image: {
        toolbar: [
          'toggleImageCaption',
          'imageTextAlternative',
          '|',
          'imageStyle:inline',
          'imageStyle:wrapText',
          'imageStyle:breakText',
          '|',
          'resizeImage'
        ]
      },
      licenseKey: LICENSE_KEY,
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        decorators: {
          toggleDownloadable: {
            mode: 'manual',
            label: 'Downloadable',
            attributes: {
              download: 'file'
            }
          }
        }
      },
      list: {
        properties: {
          styles: true,
          startIndex: true,
          reversed: true
        }
      },
      mention: {
        feeds: [
          {
            marker: '@',
            feed: [

            ]
          }
        ]
      },
      placeholder: 'Tu piszemy coś',
      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
      }
    };

    this.isLayoutReady = true;
    this.changeDetector.detectChanges();
  }

  updateSpecPage() {
    const formData = new FormData();
    if(this.selectedImage) {
      formData.append('image', this.selectedImage);
    }
    formData.append('body', new Blob([JSON.stringify(this.specializationPage)], { type: 'application/json' }));
    console.log(formData);
    console.log(this.specializationPage);
    console.log(this.selectedLanguage);
    console.log(this.specId);
    if(this.specPageExists){
      this.specializationService.updateSpecializationPage(formData, this.specId).subscribe({
        next: () =>{
          alert('Success');

        },
        error: error => {
          alert(error.error.message);
        }
      });
    }else{
      this.specializationService.createSpecializationPage(formData, this.specId).subscribe({
        next: () =>{
          alert('Success');
          this.specPageExists = true;
        },
        error: error => {
          alert(error.error.message);
        }
      });
    }

  }

  deleteSpecPage() {
    if(confirm('Napewno usunąć tą stronę?')) {
      this.specializationService.deleteSpecializationPage(this.specId, this.selectedLanguage!.code).subscribe({
        next: ()=>{
          this.router.navigate(['/edit/specialization-page'])
        }
      })
    }
  }


  deleteImage() {
    if(confirm('Napewno usunąć tą obrazek?')) {
      this.specializationService.deleteSpecializationPagePhoto(this.specId).subscribe({
        next: ()=>{
          alert("Success")
        },
        error: error => {
          alert(error.error.message);
        }
      })
    }
  }

  cancelSelectedImage() {
    this.selectedImage = null;
    this.imagePreview = '';
  }
  protected readonly environment = environment;
}
