import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public mode = 1;
  public output:any = null;
  public input = "";
  title = 'markdownconverter';

  constructor(
    private http: HttpClient,
    private dom: DomSanitizer
  ) {

  }

  m1() {
    this.mode = 1;
  }

  m2() {
    this.mode = 2;
  }
  outputText = "";
  copyToClipboard() {
    let l = (e: ClipboardEvent) => {
      e.clipboardData!.setData('text/plain', (this.outputText));
      e.preventDefault();
      document.removeEventListener('copy', l);
      alert('Copied.');
    };
    document.addEventListener('copy', l);
    document.execCommand('copy');
  }


  convert() {
    let url = "https://api.caching.guru/v1/markdown/getHTML";
    if (this.mode == 2) {
      url = "https://api.caching.guru/v1/markdown/getMarkdown";
    }
    this.http.post<any>(url, {"input": this.input}).subscribe(r => {
      this.output = this.dom.bypassSecurityTrustHtml(r.output);
      this.outputText = r.output;
    })
  }

  ngOnInit(): void {
      
  }
}
