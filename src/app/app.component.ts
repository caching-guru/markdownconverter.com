import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public mode = 1;
  public output:any = null;
  public input = `
  # h1 Heading 8-)
  ## h2 Heading
  ### h3 Heading
  #### h4 Heading
  ##### h5 Heading
  ###### h6 Heading
  Alternatively, for H1 and H2, an underline-ish style:
  Alt-H1
  ======
  Alt-H2
  ------
  Emphasis, aka italics, with *asterisks* or _underscores_.
  Strong emphasis, aka bold, with **asterisks** or __underscores__.
  Combined emphasis with **asterisks and _underscores_**.
  Strikethrough uses two tildes. ~~Scratch this.~~
  **This is bold text**
  __This is bold text__
  *This is italic text*
  _This is italic text_
  ~~Strikethrough~~
  1. First ordered list item
  2. Another item
  * Unordered sub-list.
  * And another item.
  ⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).
  ⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
  ⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅
  ⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)
  * Unordered list can use asterisks
  - Or minuses
  + Or pluses
  1. Make my changes
      1. Fix bug
      2. Improve formatting
          - Make the headings bigger

  + Create a list by starting a line with \`+\`, \`-\`, or \`*\`
  - [x] Finish my changes
  - [ ] Push my commits to GitHub
  - [ ] Open a pull request
  - [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported
  - [x] list syntax required (any unordered or ordered list supported)
  - [x] this is a complete item
  - [ ] this is an incomplete item
  [I'm an inline-style link](https://www.google.com)
  [I'm an inline-style link with title](https://www.google.com "Google's Homepage")
  [I'm a relative reference to a repository file](../blob/master/LICENSE)
  [You can use numbers for reference-style link definitions][1]
  Or leave it empty and use the [link text itself].
  URLs and URLs in angle brackets will automatically get turned into links.
  http://www.example.com or <http://www.example.com> and sometimes
  example.com (but not on Github, for example).
  
  Inline-style:
  ![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")
  
  [logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"
  ![Minion](https://octodex.github.com/images/minion.png)
  ![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")
  Like links, Images also have a footnote style syntax

  Colons can be used to align columns.
  | Tables        | Are           | Cool  |
  | ------------- |:-------------:| -----:|
  | col 3 is      | right-aligned | $1600 |
  | col 2 is      | centered      |   $12 |
  | zebra stripes | are neat      |    $1 |

  There must be at least 3 dashes separating each header cell.
  The outer pipes (|) are optional, and you don't need to make the
  raw Markdown line up prettily. You can also use inline Markdown.
  
  \`\`\`javascript
  console.log("this is now english but should also stay english");
  \`\`\`
  \`this inline code should stay the same too\`
  Three or more...
  ---
  Hyphens
  ***
  Asterisks
  ___
  Underscores
  [![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](http://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE)
  Finish`;
  title = 'markdownconverter';
  public loading = false;

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef,
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
    this.loading = true;
    let url = "https://api.caching.guru/v1/markdown/getHTML";
    if (this.mode == 2) {
      url = "https://api.caching.guru/v1/markdown/getMarkdown";
    }
    this.http.post<any>(url, {"input": this.input}).subscribe(r => {
      this.output = this.dom.bypassSecurityTrustHtml(r.output);
      this.outputText = r.output;
      this.loading = false;
      this.cd.detectChanges();
    })
  }

  ngOnInit(): void {
      
  }
}
