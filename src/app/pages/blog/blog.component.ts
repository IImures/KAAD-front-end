import { Component } from '@angular/core';
import {PostComponent} from "./post/post.component";
import {PostDetails} from "../../interfaces/post-details";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    PostComponent,
    NgForOf
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  postsDetails: PostDetails[] = [
    {
      postId: '1',
      author: 'Adrian Dzienkiewicz',
      createdAt: '1700000000000',
      content: 'Informue bla bla bla',
      contentLength: 3
    },
    {
      postId: '2',
      author: 'Adrian Dzienkiewicz',
      createdAt: '2024-02-10',
      content: '1725450606 ew  asdf asd asdf wasdF ASDF ASDF ASD FASDF ASD SZDAF ASD FASDF ASD DAS XASf ASD D fdas FDas asdf asdf asd asdf asdf das fasdf asdfv asddf weadfg asdfg werasg easrg easg rteawawre wera rgaew gr qwEDF ASD W aqweA FWEa wea weaF WASDVF ASDFDFRG AWER 473',
      contentLength: 3
    },
    {
      postId: '3',
      author: 'Adrian Dzienkiewicz',
      createdAt: '1725460004900',
      content: 'Informue bla bla bla 1 2 34 2352 aszfgdasd as fsadqw CASDFWA EFASDVASDF  Wasefrasc asdrf  aWERF WAEAWER AWSDFAWD  AWEFASD  As dfdwA C ASDF AZSDFGA Wzsad AWEF AWSE ZVSDFWD  a waef  fdasXCaw fAS D fA asdF qwe casdD FWA cAWE C a fqeQE acd  AWEEFAw awe fawsddf qwSDDF wer   AFD waed fwadf asdf asdf awdsf asdc asd  aSDF ASdfasdfasdfasd ass dfasd fwads fdsaf asdf awsdf asd fasdf asdf asddf a fasd SDf asdf asdf asdf asdf wadsf asdf asdf asd asddfasdfdasfasd asdf asdwf asdf das fasdfvc dasf asdf asdf asdf asdfasdfawsfasdfdasdfASSFASDFASD ASD ASDF AWSDDFASDF SASDFASD ASDF ASDF ASDFASD FAS  ASDSDAFASDFDSAADFSDFSAFSD SDAFASDFDSASFDASASDFDASFDS ASDFASDFSDA ASDF ASDFASDFASD F SDA SD FSDA ASD ASDF ASD FASD FDAS FASD FASDM, FKLASDF KLWEADSFKOLNASDKON ASEDFJLFGN ASDJKLN FASDJKLM ASDKLMJFV O[JKLADSN FO[ASD FJO[KLDSA O[FJKLD ASOJN FDASO[JKN FVAJKSON SDAFO[JKN FD DASF FADS FJMLDAS KLOFDASNMKLN ADFSVOJKLADFGS O ',
      contentLength: 150
    },
    {
      postId: '4',
      author: 'Adrian Dzienkiewicz',
      createdAt: '1725460004900',
      content: 'Informue bla bla bla 1 2 34 2352 aszfgdasd as fsadqw CASDFWA EFASDVASDF  Wasefrasc asdrf  aWERF WAEAWER AWSDFAWD  AWEFASD  As dfdwA C ASDF AZSDFGA Wzsad AWEF AWSE ZVSDFWD  a waef  fdasXCaw fAS D fA asdF qwe casdD FWA cAWE C a fqeQE acd  AWEEFAw awe fawsddf qwSDDF wer   AFD waed fwadf asdf asdf awdsf asdc asd  aSDF ASdfasdfasdfasd ass dfasd fwads fdsaf asdf awsdf asd fasdf asdf asddf a fasd SDf asdf asdf asdf asdf wadsf asdf asdf asd asddfasdfdasfasd asdf asdwf asdf das fasdfvc dasf asdf asdf asdf asdfasdfawsfasdfdasdfASSFASDFASD ASD ASDF AWSDDFASDF SASDFASD ASDF ASDF ASDFASD FAS  ASDSDAFASDFDSAADFSDFSAFSD SDAFASDFDSASFDASASDFDASFDS ASDFASDFSDA ASDF ASDFASDFASD F SDA SD FSDA ASD ASDF ASD FASD FDAS FASD FASDM, FKLASDF KLWEADSFKOLNASDKON ASEDFJLFGN ASDJKLN FASDJKLM ASDKLMJFV O[JKLADSN FO[ASD FJO[KLDSA O[FJKLD ASOJN FDASO[JKN FVAJKSON SDAFO[JKN FD DASF FADS FJMLDAS KLOFDASNMKLN ADFSVOJKLADFGS O ',
      contentLength: 150
    },
    // {
    //   postId: '4',
    //   author: 'Adrian Dzienkiewicz',
    //   created_at: '1725400686473',
    //   content: 'Informue blaerg erg erw gerw gerw g ewg ewt gerw gewr tg etrwg ewtr g ewttr gew rqg ewr ge wg ewr g ewg ew gew g wssssdddsasdacsadcasdcsdasacsdcsdacsadcsacsdadscadscacdsadcsadcsadcsdcsadscadcadcsdcasdcasdcadacsdcasdcasdacsdcasdcsadcsdcsdcsaadcadcsacdsasdcasdcasd' +
    //     'csadcsadcdsacascasdcsadcsdacsdacs' +
    //     'acsdcdsacasdcddcsaacdscdsacdasdcasdcsadcsadce' +
    //     'wdr g ewrg w erg erw gwer gw erg w gtw wgt gtw gtw tgwtgw tw tg t gtr bla bla',
    //   contentLength: 3
    // },
  ]
}
