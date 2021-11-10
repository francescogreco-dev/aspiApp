import { Component, OnInit } from '@angular/core';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.page.html',
  styleUrls: ['./purchase-order.page.scss'],
})
export class PurchaseOrderPage implements OnInit {

  constructor(private pdf: PDFGenerator) { }

  ngOnInit() {
  }

  createPdf() {
    let options = {
      documentSize: 'A4',
      type: 'share',
      fileName: 'Richiesta.pdf'
    };

    this.pdf.fromData('<html><h1>Modulo di richiesta magazzino</h1><div>Questo è un test di generazione pdf per una richiesta d\'ordine al magazzino.<br><br><b>Cordialmente, F.sco Greco</b></div></html>', options)
      .then((base64) => 'ok')   // it will
      .catch((err) => console.log(err))
  }

}
