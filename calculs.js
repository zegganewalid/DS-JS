export function getValues() {
  const inputMontant = document.getElementById('inputMontant');
  const inputTaux = document.getElementById('inputTaux');
  const inputAnnee = document.getElementById('inputAnnee');
  
  let montant = Math.abs(inputMontant.valueAsNumber) || 0,
      annee = Math.abs(inputAnnee.valueAsNumber) || 0,
      mois = annee * 12 || 1,
      taux = Math.abs(inputTaux.valueAsNumber) || 0,
      tauxMensuel = taux / 100 / 12;

  return { montant, annee, mois, taux, tauxMensuel };
}

export function calculMensualite(montant, tauxMensuel, mois) {
  if (tauxMensuel) {
    return montant * tauxMensuel / (1 - Math.pow(1 / (1 + tauxMensuel), mois));
  } else {
    return montant / mois;
  }
}

export function calculAmortissement(montant, tauxMensuel, mois, annee) {
  let remboursementMensuel = calculMensualite(montant, tauxMensuel, mois);
  let balance = montant;
  let amortissementM = [];

  for (let y = 0; y < annee; y++) {
    for (let m = 0; m < 12; m++) {
      let interestM = balance * tauxMensuel;
      let montantM = remboursementMensuel - interestM;
      balance -= montantM;
      amortissementM.push({
        remboursementMensuel,
        capitalAmorti: montantM,
        interet: interestM,
        capitalRestantDu: balance
      });
    }
  }

  return amortissementM;
}
