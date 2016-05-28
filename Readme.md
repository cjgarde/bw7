# BW7 First technical test

To run, open in a browser the **index.html** file.

You'll find two button in order to execute the operation with a random array or enter manually the numbers.

The *core* of the web is in the file ***js/carlosgarde.js**. The most important function (which calculates the biggest sum with the restrictions of the test) is **_calculateSum**. This one receives a sorted array.

The idea was order the array, and then from the end going pairing till the beginning. If there is a zero value, only will paired with the closer negative number to it if there are an odd number of negative elements. In other case, zewo won't be paired. 

This is because multplying two negative numbers we obtain a positive one. And we won't the biggest sum possible, so if we have and odd number of negative elements, the one close to zero will be "removed" multiplying by it.