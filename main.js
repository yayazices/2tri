const log2 = x => Math.log(x) / Math.log(2);

const sets = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  digits: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.<>?/\\|~`',
  ambiguous: 'O0oIl1|S5B8Z2\'"'
};

function buildAlphabet(opts){
  let alphabet = '';
  if (opts.lower) alphabet += sets.lower;
  if (opts.upper) alphabet += sets.upper;
  if (opts.digits) alphabet += sets.digits;
  if (opts.symbols) alphabet += sets.symbols;
  if (opts.ambiguous){
    const amb = new Set(sets.ambiguous.split(''));
    alphabet = [...alphabet].filter(ch => !amb.has(ch)).join('');
  }
  return [...new Set(alphabet)].join('');
}

function getRandomInt(max){
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

function generatePassword(len, alphabet){
  let chars = [];
  for (let i=0;i<len;i++){
    chars.push(alphabet[getRandomInt(alphabet.length)]);
  }
  return chars.join('');
}

function estimateEntropy(len, alphabetSize){
  return len * log2(alphabetSize);
}

function refresh(){
  const opts = {
    lower: document.getElementById('lower').checked,
    upper: document.getElementById('upper').checked,
    digits: document.getElementById('digits').checked,
    symbols: document.getElementById('symbols').checked,
    ambiguous: document.getElementById('ambiguous').checked
  };
  const len = +document.getElementById('length').value;
  document.getElementById('lengthLabel').textContent = len;

  const alphabet = buildAlphabet(opts);
  const pwd = generatePassword(len, alphabet);
  document.getElementById('password').value = pwd;

  const entropy = estimateEntropy(len, alphabet.length);
  document.getElementById('entropy').textContent = entropy.toFixed(1) + ' bits';
}

document.getElementById('generateTop').addEventListener('click', refresh);
document.getElementById('regenerate').addEventListener('click', refresh);

refresh();