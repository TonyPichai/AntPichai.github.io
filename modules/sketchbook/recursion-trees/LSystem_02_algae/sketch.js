/*
Taken from Wikipedia 

The original L-System for modeling the growth of Algae
https://en.wikipedia.org/wiki/L-system

Variables: A B
Constants: none
Axiom: A 
Rules: (A → AB), (B → A)

n=0:               A             . Start (axiom/initiator)
                  / \
n=1:             A   B           . The initial single A spawned into AB by rule
                /|     \		   (A → AB), rule (B → A) couldn't be applied
			   / |		\
n=2:          A  B       A        . Former string AB with all rules applied,
             /|  |       |\	   		A spawned into AB again, former B turned into A
			/ |  |		 | \
n=3:       A  B  A       A  B     . Note all A's producing a copy of themselves 
          /|  |  |\      |\  \	   	in the first place, then a B, which turns ...
		 / |  |	 | \	 | \  \
n=4:    A  B  A  A  B    A  B  A   . into an A one generation later, starting to spawn/repeat/recurse then

1. Define axiom and sentence
2. Create objects to represent the rules 
3. Generate
*/

// 1.
var axiom = "A"; // (the initial string)
var sentence = axiom; // we'll call that sentence

/* 2. WRITING RULES
1. Rule1.a = 'state 1',
   Rule1.b = 'state 2'

- Just consider rules as conditions and states 

Contain in an array and add in JSON format.
*/
var rules = [];

rules[0] = {  // var rule1 = { a: '', b: ''};
	a: "A",
	b: "ABC"
}
rules[1] = {
	a: "B",
	b: "A"
}

/* 3.
- Pass over length of the sentence,
Stop at each Char(letter)

CHECK!

- Is the Char equal to the condition: rule1.a or rule2.a?

Accordingly, 
add the state change (calculation) to => newSentence

- pint new sentence in a DOM <p>
*/
function generate () {
	var newSentence = ""; // What's this

	for (var i = 0; i < sentence.length; i++) { // Pass over sentence
		var currentLetter = sentence.charAt(i); // Get letter
		var found = false;
		for (var j = 0; j < rules.length; j++) {
			if (currentLetter == rules[j].a) {
				found = true;
				newSentence += rules[j].b;
				break;
			}
		}
		if (!found) {
			newSentence += currentLetter;
		}
	}
	sentence = newSentence
	createP(sentence);
}



function setup() {
	// createCanvas(windowWidth, windowHeight);
	// put setup code here
	noCanvas();
	createP(axiom);
	var button = createButton("generate")
	button.mousePressed(generate);
}

// function draw() {
// 	// put drawing code here
// 	background(0);

// }
