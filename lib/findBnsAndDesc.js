const findBonusAndDescription = (args, bonusRegex, descRegex, dieMax, dieMin) => {

  console.log('findBonusAndDescription', args, bonusRegex, descRegex, dieMax, dieMin);

  let errorMsg;
  let output = {};
  let bnsInd = args.findIndex(arg => arg.match(bonusRegex)) || null;
  let descInd = args.findIndex(arg => arg.match(descRegex)) || null;
  let rollBonus = 0;
  let description;

  bnsInd = bnsInd < 0 ? undefined : bnsInd;
  descInd = descInd < 0 ? undefined : descInd;
  
  console.log('nerp', args, bnsInd, descInd);

  // console.log('look', bnsInd (bnsInd < descInd || descInd === undefined))
  if(bnsInd && 
    (bnsInd < descInd || descInd === undefined)){
    rollBonus = parseInt(args[bnsInd]);
    console.log('rollBonus', rollBonus);
    rollBonus = isNaN(rollBonus) ? 0 : rollBonus;
  }

  if(bnsInd && descInd && descInd < bnsInd){
    errorMsg = "Declare any bonus to the roll prior to descriptive text.";
  }
  

  let rollResult = Math.floor(Math.random() * (dieMax - dieMin + 1) + dieMin);

  if(descInd) description = args.slice(descInd).join(' ').substr(1);

  
  output.rollResult = rollResult;
  output.description = description;
  output.rollBonus = rollBonus;

  if(errorMsg){
    output.errorMsg = errorMsg;
  }
  
  console.log('output', output);

  return output;
}

module.exports = findBonusAndDescription;