# Calculating sum in arrays

To run, open in a browser the **index.html** file.

You'll find two buttons in order to execute the operation either a random array or enter manually the numbers.

The *core* of this test (the main algorithm) is in the file **js/carlosgarde.js**. 

The most important function (which calculates the biggest sum with the restrictions of the test) is  named **_calculateSum**. This one receives an array (can be sorted or not).

The idea is order the array, and then from the end, going pairing till the beginning. If there is a zero value, only will be paired with the closest negative number to it, if there is an odd number of negative elements. In other case, zewo won't be paired. 

This is because multplying two negative numbers we obtain a positive one. And we want the biggest sum possible, so if we have and odd number of negative elements, the one closest to zero will be "removed" multiplying by it.
