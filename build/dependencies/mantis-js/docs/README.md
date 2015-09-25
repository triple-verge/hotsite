Mantis.js documentation
=======================
\* *In draft*

API Methods
-----------

### Ajax

- [$.ajax()](#ajax)
- [.load()](#load)


### Attributes

- [.attr()](#attr)
- [.hasAttr()](#hasAttr)
- [.removeAttr()](#removeAttr)


### Classes

- [.addClass()](#addClassname)
- [.class()](#class)
- [.hasClass()](#hasClass)
- [.removeClass()](#removeClass)
- [.toggleClass()](#toggleClass)


### Core

- [.each()](#each)
- [.map()](#map)
- [.mapOne()](#mapOne)


### Events

- [.off()](#off)
- [.on()](#on)
- [.trigger()](#trigger)


### Forms

- [.blur()](#blur)
- [.focus()](#focus)
- [.submit()](#submit)
- [.val()](#val)


### Manipulation

- [.append()](#append)
- [.empty()](#empty)
- [.html()](#html)
- [.prepend()](#prepend)
- [.remove()](#remove)


### Style

- [.css()](#css)


### Traversing

- [.children()](#children)
- [.eq()](#eq)
- [.filter()](#filter)
- [.find()](#find)
- [.first()](#first)
- [.last()](#last)
- [.next()](#next)
- [.parent()](#parent)
- [.prev()](#prev)
- [.siblings()](#siblings)
- [.slice()](#slice)


Selectors
---------

At it's core, Mantis.js uses the *querySelectorAll* function, to know which selectors are supported, visit: [https://developer.mozilla.org/pt-BR/docs/DOM/Document.querySelectorAll](https://developer.mozilla.org/pt-BR/docs/DOM/Document.querySelectorAll)

### $(element)

```javascript
$('div') // Get all DIV elements on the page

$('.example') // Get all elements on the page that have class 'example'

$('#example') // Get the element on the page that have id 'example'

$('p span') // Get all SPAN elements that are children of the P element
```


---


Attributes
----------

Comming soon


---


CSS
---

These methods get and set CSS-related properties of elements.

### .addClass(name)

Adds the specified class(es) to each of the set of matched elements.

```javascript
$(element).addClass('example');
```

More than one class may be added at a time, separated by a space, to the set of matched elements, like so:

```javascript
$(element).addClass('example example2');
```

### .toggleClass(name)

Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the switch argument.

```javascript
$(element).toggleClass('example');
```

More than one class may be added or removed at a time, separated by a space, to the set of matched elements, like so:

```javascript
$(element).toggleClass('example example2');
```

### .hasClass(name)

Determine whether any of the matched elements are assigned the given class.

Elements may have more than one class assigned to them. In HTML, this is represented by separating the class names with a space:

```html
<div id="example" class="example example2"></div>
```

The *.hasClass()* method will return true if the class is assigned to an element, even if other classes also are. For example, given the HTML above, the following will return *true*:

```javascript
$('#example').hasClass('example');
```

As would:

```javascript
$('#example').hasClass('example2');
```

While this would return *false*:

```javascript
$('#example').hasClass('example3');
```

Another example:

```javascript
if ($('#example').hasClass('example')) {
	// Do something if return true
} else {
	// Do something if return false
}
```

More comming soon.


---


Events
------

These methods are used to register behaviors to take effect when the user interacts with the browser, and to further manipulate those registered behaviors.

### .on()

Attach an event handler function for a event to the selected elements.

```javascript
$(element).on('click', function () {
	// Your code here
});
```

### .off()

Remove an event handler.

```javascript
$(element).off('click', function () {
	// Your code here
});
```


License
-------

© 2013 - 2014 Acauã Montiel

[MIT License](http://acaua.mit-license.org/)
