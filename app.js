const randKey = (obj) => {
  let keys = Object.keys(obj);
  return keys[ keys.length * Math.random() << 0];
};

let asciiArt = null

jQuery.get('http://localhost/foo.txt', function(data) {
    asciiArt = data;
});

$(".nav-link").click( (e) => {
  event.preventDefault();
  $('html,body').animate({scrollTop:$(this.hash).offset().top}, 1200);
});

let presentTitle = () => {
  return;
}

document.addEventListener('DOMContentLoaded', (e) => {
  // array with texts to type in typewriter
  var printTexts = {
    java: 'System.out.print(cdrlao)',
    python: 'print(cdrlao)',
    'c++': 'std::cout << cdrlao',
    js: 'console.log(cdrlao)'
  }

  // type one text in the typwriter
  // keeps calling itself until the text is finished
  let typeWriter = (lang, text, i) => {
    // chekc if text isn't finished yet
    if (i >= text.length) {
      setTimeout( () => {
        $('#landing-page').fadeOut('slow');
        presentTitle()
        // $('.navbar').fadeIn();
      }, 500);
      return;
    }

    // add next character to h1

    let typedChars = text.slice(0, i+1);
    if (typedChars.includes('out') && lang == 'java'){
      idx = typedChars.indexOf('out');
      typedChars = `${typedChars.slice(0, idx)}<i>out</i>${typedChars.slice(idx + 3)}`;
    }
    else if (typedChars.includes('std') && lang == 'c++') {
      idx = typedChars.indexOf('std');
      typedChars = `<i>std</i>${typedChars.slice(idx + 3)}`;
    }
    else if (typedChars.includes('console') && lang == 'js') {
      idx = typedChars.indexOf('console');
      typedChars = `<i>console</i>${typedChars.slice(idx + 7)}`;
    }

    typedChars +='<span aria-hidden="true" id="cursor"></span>';

    document.querySelector("#loading").innerHTML = typedChars;
    // wait for a while and call this function again for next character
    setTimeout( () => {
      typeWriter(lang, text, i + 1)
    }, 50);
  }
  let printLang = randKey(printTexts);
  // start the text animation
  typeWriter(printLang, printTexts[printLang], 0);

});
