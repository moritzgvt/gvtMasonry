(function( $ ) {

//	// define funcitons

	// math out the amount of columns
	function getElementWidth( postContainer, containerColumns ) {

		var gvtAbsoluteGridWidth = jQuery( postContainer ).width();

		return Math.floor( parseInt( gvtAbsoluteGridWidth ) / parseInt( containerColumns ) );

	} // getColumns()

	// place elements depending on amount of columns and element height
	function placeElements( container, group, columns ) {

		// initialize scope variables
		var gvtElementId = 0;
		var gvtTotalHeight = 0;
		var gvtElementWidth = getElementWidth( container, columns );

		var gvtElementArray = [];

	//	// iterate through element group

		jQuery( group ).each( function() {

			// initialize scope variables
			var gvtVerticalTransform = 0; 
			var gvtVerticalHeightArray = [];

			// get horizontal position depending on amount of column
			var gvtHorizontalCount = gvtElementId % columns;
			var gvtHorizontalTransform = gvtHorizontalCount * parseInt( gvtElementWidth );

			// do dom stuff
			// add id to element
			jQuery( this ).attr({
				'id': 'post_' + gvtElementId,
				'data-id': gvtElementId,
				'data-count': gvtHorizontalCount,
			});

			// add element width depending on amount of columns to this element
			// get the height of each element depending on its width
			jQuery( this ).css( 'width', gvtElementWidth );
			var gvtElementHeight = jQuery( this ).height();

			// add height
			jQuery( this ).attr({
				'height': gvtElementHeight + 'px',
			})


		//	// push all heights of this data count into vertical height array

			jQuery.each( gvtElementArray, function( key, val ) {

				var gvtHorizontalCountFilter = key % columns;

				if ( gvtHorizontalCount == gvtHorizontalCountFilter ) {
					gvtVerticalHeightArray.push( val );
				}

			});


		//	// iterate through vertical height array

			jQuery.each( gvtVerticalHeightArray, function( key, val ) {

				// sum up all heights of this data count	
				gvtVerticalTransform += val;

				// get highest value from vertical transform + this Element
				var gvtCurrentMaxHeight = parseInt( gvtVerticalTransform + gvtElementHeight);

				if( gvtCurrentMaxHeight > gvtTotalHeight ) {
					
					gvtTotalHeight = gvtCurrentMaxHeight;

					// add total height to masonry container
					container.css('height', parseInt( gvtTotalHeight ) );
				}

			});

			// write horizontal an vertical transforms to element css
			jQuery( this ).css({
				'position' : 'absolute',
				'-webkit-transform':'translate('+ gvtHorizontalTransform +'px,' + gvtVerticalTransform + 'px)',
				'-moz-transform':'translate('+ gvtHorizontalTransform +'px,' + gvtVerticalTransform + 'px)',
				'transform':'translate('+ gvtHorizontalTransform +'px,' + gvtVerticalTransform + 'px)'
			});

			// do iteration things
			// push current element height into array of all elements
			gvtElementArray.push( gvtElementHeight );
			gvtElementId++;

		});		

	} // placeElements()


//	// jquery call

	jQuery.fn.gvtMasonry = function( columnCount ) {

		var postContainer = jQuery( this );
		var postElements = jQuery( this ).children( 'div' );


		if ( !columnCount ) {
			columnCount = 3;
		}

		placeElements( postContainer, postElements, columnCount );


	}


})( jQuery );