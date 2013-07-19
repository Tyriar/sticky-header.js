# sticky-header.js

A JavaScript library that enables a table's header to scroll with the page.

![An example of a table header scrolling with the table](http://3.bp.blogspot.com/-smWCVOs_wlo/UVa0yXR8JDI/AAAAAAAAOUM/p0ccflBSusI/s1600/demo.png)

## Details

The scrolling header is accomplished by cloning the `<thead>` element which is then positioned absolutely using JavaScript, this keeps the original table intact. The cloned header uses `aria-hidden` in order to hide itself from assistive technologies.

## Usage

    <table class="sticky-header">
        ...
    </table>
    
## Support

 - Chrome
 - Firefox
 - Safari
 - Opera
 - Internet Explorer 8+
    
## License

> Copyright (C) 2012 Daniel Imms, [http://www.growingwiththeweb.com](http://www.growingwiththeweb.com)

> Permission is hereby granted, free of charge, to any person obtaining a copy of
> this software and associated documentation files (the "Software"), to deal in
> the Software without restriction, including without limitation the rights to
> use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
> of the Software, and to permit persons to whom the Software is furnished to do
> so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.
    
## Links

 - [Write-up on my blog](http://www.growingwiththeweb.com/2013/03/sticky-headerjs.html)
 - [demo.htm on htmlpreview.github.io](http://htmlpreview.github.io/?https://github.com/Tyriar/sticky-header.js/blob/master/demo.htm)
