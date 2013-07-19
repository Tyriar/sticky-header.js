# sticky-header.js

A JavaScript library that enables a table's header to scroll with the page.

![An example of a table header scrolling with the table](http://3.bp.blogspot.com/-smWCVOs_wlo/UVa0yXR8JDI/AAAAAAAAOUM/p0ccflBSusI/s1600/demo.png)

## Details

The scrolling header is accomplished by cloning the `<thead>` element which is then positioned absolutely using JavaScript, this keeps the original table intact. The cloned header uses `aria-hidden` in order to hide itself from assistive technologies.

## Usage

    <table class="sticky-header">
        ...
    </table>
    
## More

 - [Write-up on my blog](http://www.growingwiththeweb.com/2013/03/sticky-headerjs.html)
 - [demo.htm on htmlpreview.github.io](http://htmlpreview.github.io/?https://github.com/Tyriar/sticky-header.js/blob/master/demo.htm)