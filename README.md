This project is designed for use with Angular.

# Responsive Guide

Provides a mechanism for responsive layouts where both the height and width of the viewport matters. 

This project is intended for very specific scenarios, and not as a general purpose responsive layout system, such as Bootstrap and media queries. 

One of the issues with layout systems is that they tend to be based on the viewport width, without regard for its height. A modern smart phone, for example, may appear quite wide when in landscape, similar to a desktop monitor, however, these would have very differnet heights. If you want an exact layout that displays all content within the available viewport, for multiple device/window sizes, this can be difficult and require numerous complex media queries. The track-viewport directive provides an alternative approch. 

Responsive Guide provides a directive that tracks the current viewport size, matches it to dimesions defined via a json file, and attaches a single class to the associated element. This allows you to simply define layouts via css without media queries. The relevant device/viewport dimensions allow for average UI elements such as the address bar and toolbars.  

Responsive Guide also provides a visual overlay that allows you to see what the available area looks like as you resize the browser window.

e.g. Assume you have a top level div and apply the track-viewport directive:

```html
<div track-viewport class="container">
    <div class="constrained-layout"></div>
</div>
```

If the viewport is 1050 x 550, this would add a class that represents a tablet in landscape orientation:  
```html
<div track-viewport class="container viewport-tablet-landscape">
    <div class="constrained-layout"></div>
</div>
```

Now you can style based on context, e.g. (for illustrative purposes only):

```scss
...

.viewport-tablet-landscape .constrained-layout {
    width: 930px;
    height: 530px;
}

.viewport-tablet-portrait .constrained-layout {
    width: 530px;
    height: 930px;
}

...
```

The visual guide component can be added to show various viewport sizes.
```html
<viewport-guide />
```

You can modify, add, and remove viewport details by editing the *viewport-data.json* file.

**N.B. It's import that that the body element has margin and padding set to 0, otherwise the viewport guide layouts won't be fully representative. This must be done by you, viewport-guide does not do this for you.**

View live here: www.russellmason.com/responsive-guide

# Getting Started

1.  Clone the repository

        git clone [github path]

2.  Navigate into the workspace folder

        cd responsive-guide

3.  Install packages<br>

        npm install

4.  Run the app<br>
    Using the Angular CLI *:<br>

        ng serve -o

    You can also use the npm script *:

        npm start -- -o
