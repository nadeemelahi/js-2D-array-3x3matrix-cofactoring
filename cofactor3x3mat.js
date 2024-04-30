

/*
 * author: Nadeem Elahi
 * nadeem.elahi@gmail.com
 * nad@3deem.com
 * license: gpl v3
 */

//var mat = new Float32Array(16);

function print3x3mat ( mat ) {
	var idx , lim = 3;

	for ( idx = 0 ; idx < lim ; idx ++ ){

		console.log( mat[idx][0]
			+ " " + mat[idx][1]
			+ " " + mat[idx][2]
		);
	}
}

function make3x3array() {
	return [
		[1,0,0],
		[0,1,0],
		[0,0,1] 
	]
}

/*
 *  https://semath.info/src/cofactor-matrix.html
 *
 *   --                                                         --
 *  |                                                             |
 *  |        a11                 a12                  a13         |
 *  |                                                             |
 *  |                                                             |
 *  |        a21                 a22                  a23         |
 *  |                                                             |
 *  |                                                             |
 *  |        a31                 a32                  a33         |
 *  |                                                             |
 *   --                                                         --
 *
 *   --                                                         --
 *  |                                                             |
 *  |  a22*a33-a23*a32   -(a12*a33 - a13*a32)   a12*a23 - a13*a22 | 
 *  |                                                             |
 *  |                                                             |
 *  |-(a21*a33-a23*a31)    a11*a33 - a13*a31  -(a11*a23 - a13*a21)| 
 *  |                                                             |
 *  |                                                             |
 *  |  a21*a32-a22*a31   -(a11*a32 - a12*a31)   a11*a22 - a12*a21 | 
 *  |                                                             |
 *   --                                                        --
 *
 */

function cofactor3x3( eh , em ) {

	function calcSign ( idx , jdx ) {
		if ( (idx + jdx ) % 2 ) return -1; // odd
		else return 1; // even
	}

	var sign , signChar ;
	var idexs , jdexs , 
		idexBig , idexSm ,
		jdexBig , jdexSm ,
		cnt ;

	var idx , jdx , lim = 4 ;

	for ( idx = 1 ; idx < lim ; idx ++ ) {
		for ( jdx = 1 ; jdx < lim ; jdx ++ ) {

			sign = calcSign ( idx , jdx ) ;
			if ( sign > 0 ) signChar = " +";
			else signChar = " -";
			
			idexs = [];
			jdexs = [];
			
			for ( cnt = 1 ; cnt < lim ; cnt ++ ){ 
				if ( cnt != idx )
					idexs.push(cnt);

				if ( cnt != jdx ) 
					jdexs.push(cnt);
			}

			//console.log("---");

			idexBig = idexs.pop(); 
			jdexBig = jdexs.pop();
			idexSm = idexs.shift(); 
			jdexSm = jdexs.shift();
			//console.log("idexBig Sm: " + idexBig + ", " + idexSm);
			//console.log("jdexBig Sm: " + jdexBig + ", " + jdexSm);

			// a[] -> m[] -> swap i & j -> a-cofactor[]
			// well just call m[] a-cofactor
			// SWAP i <--> j
			console.log(
				"m[" + jdx + ", " + idx + "] = " +
				signChar +
				"(a" + idexSm + "" + jdexSm + 
				"*a" + idexBig + "" + jdexBig +
				" - " + 
				"a" + idexSm + "" + jdexBig +
				"*a" + idexBig + "" + jdexSm + ")"
			);

			
			// since we are using indices 1,2,3
			// while our array's indices go 0,1,2

			em[jdx-1][idx-1] = sign * (
				eh[idexSm-1][jdexSm-1]
				*eh[idexBig-1][jdexBig-1]
				- eh[idexSm-1][jdexBig-1]
				*eh[idexBig-1][jdexSm-1] 
			);


		}
	}

}

var eh = [];
eh[0] = [1,2,3];
eh[1] = [4,5,6];
eh[2] = [7,8,9];
console.log("---");
print3x3mat( eh );

var em = make3x3array();
cofactor3x3( eh , em );

console.log("---");
print3x3mat ( em )
