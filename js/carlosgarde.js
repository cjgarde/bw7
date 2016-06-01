//IIFE pattern with JS Module patter
//With the module patter we ensure that we have private and public methods and variables
//We only expose in the return closure the ones visible out the bw7 object
(function carlosgardetest(){ 
	
	//create a JS object with the var and methods availables
	//Revealing pattern module
	var bw7 = (function (window, undefined) {
	    /// PRIVATE VARS ///
	    var _nMaxRandomArrayElements = 50;
	    var _oBtnManualArray = $("#btnManualSum"); 
	    var _oBtnRandomArray = $("#calculateRandomButton");
		var _oRandomElementsNumber = $( "input[name='inputRandomElementsNumber']");
		var _oManualElements = $( "input[name ='inputManualElements']");
		var _oMessageToShow = {title: '', message: '', type:' '};
		var _sRegExNumbers = /^[0-9]+$/;
		var _sRegExNumbersAndCommas = /^[0-9-,]+$/;

	    /// PUBLIC VARS AND METHODS ///
	    function _addManualArrayButtonListener() {
	    	//when upload file is clicked, input upload file must triggered
	    	_oBtnManualArray.on('click', function(e){
	    		if (_oManualElements.val().match(_sRegExNumbersAndCommas)) {
	    			// conver string to integers
	    			var aManualElements = _oManualElements.val().split(',');
	    			for(var i=0; i<aManualElements.length; i++) { aManualElements[i] = +aManualElements[i]; } 
	    			_calculateSum(aManualElements);
	    		}
	    		else {
	    			_oMessageToShow = {
	    				title: 'Oooppps...',
	    				message: 'Please, insert only numbers and commas',
	    				type: 'error'
	    			}
	    			_showModal();
	    		}
	    	});
	    }

	    function _addRandomArrayButtonListener() {
	    	_oBtnRandomArray.on('click', function(e){
	    		if (_oRandomElementsNumber.val().match(_sRegExNumbers)) {
	    			// conver string to integer
	    			var nNumberOfElements = +_oRandomElementsNumber.val();

	    			if (nNumberOfElements <= _nMaxRandomArrayElements && nNumberOfElements > 0){
	 	    			var aRandomArray = _generateRandomArray(nNumberOfElements);   
	 	    			// create the random numbers between 100 and -100
	    				_calculateSum(aRandomArray);				
	    			}
	    			else {
		    			_oMessageToShow = {
		    				title: 'Oooppps...',
		    				message: 'Please, insert a number between 1 and 50',
		    				type: 'error'
		    			}
		    			_showModal();	    				
	    			}

	    		}
	    		else {
	    			_oMessageToShow = {
	    				title: 'Oooppps...',
	    				message: 'Please, insert only positive integers numbers',
	    				type: 'error'
	    			}
	    			_showModal();
	    		}	    		
	    	});
	    }

   

	    function _calculateSum (aGivenArray){
		    var result = 0;
		    var aGivenArrayCopy = aGivenArray.slice(0);

		    //if we have a valid arra and has more than one element
		    if (aGivenArrayCopy && (aGivenArrayCopy.length > 1)) {
		            var nLength = aGivenArrayCopy.length;
		           	var left = 0;
		            var right = 0;

		            // sort array
		            aGivenArrayCopy = aGivenArrayCopy.sort(function (a, b) {
		              return a < b ? -1 : 1;
		            });

		            // iterate over sorted array
		            for (var i = nLength-1; i>0; i--) {
		            	left = aGivenArrayCopy[i-1];
		            	right = aGivenArrayCopy[i];

		            	if (right <= 0 ) {
		            		// if current number is zero o less, its left elements are negative.
		            		// Multiplying two negatives numbers is a positive one.
		            		// if there is a odd position with a zero or negative number, we will summ the current one
		            		// if we are in an even position with negative or zero number, we will multiply by its closest
		            		// i.e: we enter here with the array -3,-2,-1,0
		            		// in this example we want (-3*-2) + (0*-1) = 6
		            		// i.e. 2: (-5,-4,-3) = (-5*-4) * (-3) = 17
		            		if(i%2 !== 0) { //odd position
		            			result = result + (right * left); 
		            			i--;
		            		}
		            		else{ //even position
		            			result = result + right
		            		}		            		
		                	
		            	}
		            	else {
		            		if (left <= 0 && right > 0){
		            			// if current element is positive and closest in the left is zero
		            			// we will not pair them and will add to the result the current number
		            			result = result + right;
		            		}
		            		else {
		            			// finally we have the elements that will pair
		            			// this last case is if both are positive or negative (to obtain a positive multiplication)
		            			if ( (right > 0 && left >0) || (right <0 && left <0) )
		            			{
		            				// here, the only special case if both are 1
		            				// so we don't pair them, we will sum	
		            				if ((right === 1) && (left === 1) ) {
		            					result = result + right + left;
		            				}
		            				else {
		            					result = result + (right * left);
		            				}
		            				i--;
		            			}
		            		}
		            	}
		            	// check if there is an orphan, to sum it to the result
		            	result = i === 1 ? result + aGivenArrayCopy[0] : result;
		            } // end for
		        }
		    else {
		        // if the array is not valid return a string 
		        // and if only has element, return this only element
		        result = aGivenArrayCopy ? aGivenArrayCopy[0] : 'No valid array';
		    }

		        // print result
		        _oMessageToShow = {
	    				title: 'Result',
	    				message: 'The biggest sum is: ' + result + '\n The array is: ' + aGivenArray,
	    				type: 'success'
	    			}
	    		_showModal();	    	
	    }


	    function _init() {
	    	//load Button Handlers in orders to handle the click events
	    	_addRandomArrayButtonListener();
	    	_addManualArrayButtonListener();
	    }


	    function _generateRandomArray(nNumberOfElements){
	    	var arr = [];
	    	var minRange = -100;
	    	var maxRange = 100;

			while(arr.length < nNumberOfElements){
			  var randomnumber=Math.ceil(Math.random()* (maxRange - minRange + 1) + minRange);
			  var found=false;
			  for(var i=0;i<arr.length;i++){
				if(arr[i]==randomnumber){found=true;break}
			  }
			  if(!found)arr[arr.length]=randomnumber;
			}

			return arr;
	    }


	    function _showModal() {
	    	if (_oMessageToShow.type === 'error') {
	    		sweetAlert(_oMessageToShow.title, _oMessageToShow.message, "error");
	    		console.log('--> ERROR: ', _oMessageToShow.message);
	    	}
	    	else if (_oMessageToShow.type === 'success') {
	    		swal({ title: _oMessageToShow.title,   text: _oMessageToShow.message,   imageUrl: "media/thumbs-up.jpg" });
	    		console.log('--> SUCCESS: ', _oMessageToShow.message);
	    	}
	    }


	    return {
	    	//expose visible or public methods
	    	init: _init,
	    }
	})(window);


	//Begin of the test, only this first step is visible
	bw7.init();

}());
