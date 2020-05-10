//@flow
const fuzzysort = require('./fuzzysort')
var drugsSmall = require('./drugsSmall.json');
var drugsLarge = require('./drugsLarge.json');
var genericName = require('./genericName.json');

// returns list of lists
function permute_word(list_of_letters) {
  var m = []
  for (var i = 0; i< list_of_letters.length; i++){
    var l = list_of_letters[i]
    if (l === 'a') {m.push([''])}
    else if (l === 'b') {m.push(['b','p'])}
    else if (l === 'd') {m.push(['d'])}
    else if (l === 'e') {m.push(['','y'])} //aei
    else if (l === 'v') {m.push(['f','v'])}
    else if (l === 'g') {m.push(['g','j'])}
    else if (l === 'h') {m.push(['h',''])}
    else if (l === 'k') {m.push(['k','ch','c','q','x'])}
    else if (l === 'l') {m.push(['l'])}
    else if (l === 'm') {m.push(['m'])}
    else if (l === 'n') {m.push(['n'])}
    else if (l === 'o') {m.push(['w',''])}
    else if (l === 'r') {m.push(['r'])}
    else if (l === 's') {m.push(['c','s','th','x','ch',''])}
    else if (l === 'sh') {m.push(['sh','ch'])}
    else if (l === 't') {m.push(['t'])}
    else if (l === 'y') {m.push(['y'])}
    else if (l === 'z') {m.push(['s','z','x','th'])}
  }
  return m;
}

function permute_wordEn(list_of_letters) {
  var m = []
  for (var i = 0; i< list_of_letters.length; i++){
    var l = list_of_letters[i]
    if (l === 'a') {m.push(['a',''])}
    else if (l === 'b') {m.push(['b','p'])}
    else if (l === 'c') {m.push(['c','k'])}
    else if (l === 'd') {m.push(['d'])}
    else if (l === 'e') {m.push(['e','i','y'])} //aei
    else if (l === 'f') {m.push(['f','v'])}
    else if (l === 'g') {m.push(['g'])}
    else if (l === 'h') {m.push(['h'])}
    else if (l === 'i') {m.push(['i','e'])}
    else if (l === 'k') {m.push(['k','ch','c','q','x'])}
    else if (l === 'l') {m.push(['l'])}
    else if (l === 'm') {m.push(['m'])}
    else if (l === 'n') {m.push(['n'])}
    else if (l === 'o') {m.push(['o','u'])}
    else if (l === 'r') {m.push(['r'])}
    else if (l === 's') {m.push(['c','s','th','x','ch',''])}
    else if (l === 't') {m.push(['t'])}
    else if (l === 'u') {m.push(['u','o'])}
    else if (l === 'v') {m.push(['v'])}
    else if (l === 'w') {m.push(['w'])}
    else if (l === 'x') {m.push(['x'])}
    else if (l === 'y') {m.push(['y','i'])}
    else if (l === 'z') {m.push(['s','z','x','th'])} // s as in zeen lasix
    else {m.push([l])}
  }

  return m;
}



// takes list of lists
// return all possible word combinations

function cartesianProduct(arr)
{
    return arr.reduce(function(a,b){
        return a.map(function(x){
            return b.map(function(y){
                return x.concat(y);
            })
        }).reduce(function(a,b){ return a.concat(b) },[])
    }, [[]])
}

// translates arabic to english
function translateArEn(word) {
  var arabicLetters = word.split("")
  if ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(arabicLetters[0])){
    var e = [] // e for english letters
    // arabicLetters here refes to englishLetters
    for (var i = 0; i < arabicLetters.length; i++){
      var l = arabicLetters[i].toLowerCase();
      if (l === ''){e.push('')}
      else if (l === 'a'){e.push('a')}
      else if (l === 'b'){e.push('b')}
      else if (l === 'c'){e.push('c')}
      else if (l === 'd'){e.push('d')}
      else if (l === 'e'){e.push('e')}
      else if (l === 'f'){e.push('f')}
      else if (l === 'g'){e.push('g')}
      else if (l === 'h'){e.push('h')}
      else if (l === 'i'){e.push('i')}
      else if (l === 'j'){e.push('j')}
      else if (l === 'k'){e.push('k')}
      else if (l === 'l'){e.push('l')}
      else if (l === 'm'){e.push('m')}
      else if (l === 'n'){e.push('n')}
      else if (l === 'o'){e.push('o')}
      else if (l === 'p'){e.push('p')}
      else if (l === 'q'){e.push('q')}
      else if (l === 'r'){e.push('r')}
      else if (l === 's'){e.push('s')}
      else if (l === 't'){e.push('t')}
      else if (l === 'u'){e.push('u')}
      else if (l === 'v'){e.push('v')}
      else if (l === 'w'){e.push('w')}
      else if (l === 'x'){e.push('x')}
      else if (l === 'y'){e.push('y')}
      else if (l === 'z'){e.push('z')}
      else {e.push('')}
    }
  }  else {
  var e = [] // e for english letters
  for (var i = 0; i < arabicLetters.length; i++){
    var l = arabicLetters[i]
    if (l === ''){e.push('')}
    else if (l === 'ا'){e.push('a')}
    else if (l === 'ب'){e.push('b')}
    else if (l === 'ت'){e.push('t')}
    else if (l === 'ث'){e.push('s')}
    else if (l === 'ج'){e.push('g')}
    else if (l === 'ح'){e.push('h')}
    else if (l === 'خ'){e.push('h')}
    else if (l === 'د'){e.push('d')}
    else if (l === 'ذ'){e.push('z')}
    else if (l === 'ر'){e.push('r')}
    else if (l === 'ز'){e.push('z')}
    else if (l === 'س'){e.push('s')}
    else if (l === 'ش'){e.push('sh')}
    else if (l === 'ص'){e.push('s')}
    else if (l === 'ض'){e.push('d')}
    else if (l === 'ط'){e.push('t')}
    else if (l === 'ظ'){e.push('z')}
    else if (l === 'ع'){e.push('')}
    else if (l === 'غ'){e.push('g')}
    else if (l === 'ف'){e.push('v')}
    else if (l === 'ق'){e.push('k')}
    else if (l === 'ك'){e.push('k')}
    else if (l === 'ل'){e.push('l')}
    else if (l === 'م'){e.push('m')}
    else if (l === 'ن'){e.push('n')}
    else if (l === 'ه'){e.push('h')}
    else if (l === 'ة'){e.push('h')}
    else if (l === 'و'){e.push('w')}
    else if (l === 'ي'){e.push('e')}
    else if (l === 'ى'){e.push('e')}
    else if (l === 'آ'){e.push('a')}
    else if (l === 'إ'){e.push('e')}
    else {e.push('a')}
  }
}
  return(e)
}

function createFinalWords(wordsList) {
  var m = []
  for (var i = 0; i < wordsList.length; i++){
    var s = wordsList[i]
    var t = s.join("")
    m.push(t)
  }
  return(m)
}

//find in drug index
function findinIndex(finalWords) {
  var mm = []
  for (var i = 0; i < finalWords.length; i++){
    var word = finalWords[i]
    if (word.length < 3){
      var o = 0
      for (var j = 0; j < drugsSmall.length; j++){
        var dict = drugsSmall[j]
        if (dict.startsWith(word)){
          mm.push({key : o,
                  result: drugsLarge[j]});
          o = o + 1
        }
      }
    } else {
      var o = 0
      for (var j = 0; j < drugsSmall.length; j++){
        var dict = drugsSmall[j]
        if (dict.includes(word)){
          mm.push({key : o,
             result: drugsLarge[j],
            drugindex: j+1});
          o = o + 1
      }
    }
  }
}

  return(mm)
}


//find in drug index
function matchEn2(finalWords) {
  var mm = []
  for (var i = 0; i < finalWords.length; i++){
    var word = finalWords[i].toUpperCase()

    if (word.length < 3){
      var o = 0
      for (var j = 0; j < drugsLarge.length; j++){
        var dict = drugsLarge[j]
        if (dict.startsWith(word)){
          mm.push({key : o,
                  result: drugsLarge[j]});
          o = o + 1
        }
      }
    } else {
      var o = 0
      for (var j = 0; j < drugsLarge.length; j++){
        var dict = drugsLarge[j]
        if (dict.includes(word)){
          mm.push({key : o,
             result: drugsLarge[j],
             drugindex: j+1});
          o = o + 1
      }
    }
  }
}
  return(mm)
}




function matchEn(finalWords) {
  var mm = []
  for (var i = 0; i < finalWords.length; i++){
    var word = finalWords[i]
    const results = fuzzysort.go(word, drugsLarge, {limit: 5})
    var result = results.map(a => a.target);

    mm.push({result});
  }

  var mu = mm.map(a => a.result)
  var newmu = []
  var o = 0
  for (var i = 0; i < mu.length; i++){
    var mz = mu[i]
    for (var j =  0; j < mz.length; j++){
      newmu.push({key : o,
                  result: mz[j]});
      o = o + 1;
    }
  }
return(newmu);
}


export function searchWord(Word) {
  console.log(Word)
  var mmm = []
  output_list = []

  if (Word.length > 2 && Word.length <15){

    var arabicLetters = Word.split("")
    if ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(arabicLetters[0])){
      var a = translateArEn(Word)
      var b = permute_wordEn(a)
      var c = cartesianProduct(b);
      var d = createFinalWords(c)
      var mmm = matchEn2(d)
      var mmm2 = []
      
      var j = 0;
      for (var i = 0; i < mmm.length ; i++){
        var r = mmm[i].result
        var drugindex = mmm[i].drugindex

        if (! mmm2.map(a => a.result).includes(r)){
          mmm2[j] = {key : i, result: r, drugindex:drugindex}
          j = j + 1
      }}
      for (var i = 0; i < mmm2.length; i++){
        firstletter = mmm2[i].result[0].toLowerCase()
        if (b[0].indexOf(firstletter) < 0){
        mmm2[i].key = mmm2[i].key + 9999
      }}

    }
    else{
      a = translateArEn(Word)
  
      var b = permute_word(a)
      
      var c = cartesianProduct(b);
      var d = createFinalWords(c)
      var mmm = findinIndex(d)
      var mmm2 = []
      var j = 0;
      for (var i = 0; i < mmm.length ; i++){
        var r = mmm[i].result
        var drugindex = mmm[i].drugindex
        if (! mmm2.map(a => a.result).includes(r)){
          mmm2[j] = {key : i, result: r, drugindex:drugindex}
          j = j + 1
      }}
      for (var i = 0; i < mmm2.length; i++){

        firstletter = mmm2[i].result[0].toLowerCase()
 
        if (b[0].indexOf(firstletter) < 0){
          mmm2[i].key = mmm2[i].key + 9999
      }}


}
  mmm2.sort(function(a, b) {
    return a.key - b.key;
  })

    output_list = []

      for (i = 0; i < Math.min(20,mmm.length); i++) {
        var drug_name = mmm2[i].result+" ";
        var genname = genericName[-1+(mmm2[i].drugindex)];
        var first_name = drug_name.split(" ")[0]
         output_list.push({
           key: i,
           drug_name : drug_name,
           drug_pic: 'https://www.google.com/search?q='+drug_name+"&tbm=isch",
           buy_drug: 'https://yaoota.com/ar-eg/search/?q='+ first_name ,
           search_drug: 'https://yaoota.com/ar-eg/search/?q='+ first_name ,
           genname : genname,
           genname_info: 'https://www.google.com/search?as_q='+genname+'&lr=lang_ar',
           drug_info: 'https://www.google.com/search?as_q='+first_name+'&lr=lang_ar'

         })

          //https://translate.google.com/translate?sl=en&tl=ar&u=https://www.drugs.com/search.php?searchterm=catafast
    }
}
return output_list
}

//console.log(searchWord('باراسيتامول'));
//searchWord()