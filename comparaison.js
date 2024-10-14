let comparaisons = [];

// Fonction pour calculer la mensualité
function calculMensualite(montant, tauxMensuel, mois) {
  if (tauxMensuel) {
    return montant * tauxMensuel / (1 - Math.pow(1 / (1 + tauxMensuel), mois));
  } else {
    return montant / mois; // Si le taux est nul, juste diviser le montant par le nombre de mois
  }
}

// Fonction pour convertir le taux annuel en taux mensuel
function calculTauxMensuel(taux) {
  return taux / 100 / 12; // Taux mensuel
}

// Fonction pour vérifier si le prêt existe déjà dans le tableau de comparaisons
function existeDeja(montant, annee, taux) {
  return comparaisons.some(prêt => 
    prêt.montant === montant && prêt.annee === annee && prêt.taux === taux
  );
}

// Fonction pour ajouter une comparaison de prêt
function ajouterComparaison() {
  const montant = parseFloat(document.getElementById('inputMontantComparaison').value);
  const annee = parseInt(document.getElementById('inputAnneeComparaison').value);
  const taux = parseFloat(document.getElementById('inputTauxComparaison').value);

  // Vérification si les champs sont vides
  if (!document.getElementById('inputMontantComparaison').value ||
      !document.getElementById('inputAnneeComparaison').value ||
      !document.getElementById('inputTauxComparaison').value) {
    alert("Tous les champs doivent être remplis !");
    return; // Ne pas continuer si les champs sont vides
  }

  // Validation des valeurs entrées
  if (montant <= 0 || annee <= 0 || taux < 0) {
    alert("Veuillez entrer des valeurs valides pour le montant, l'année et le taux.");
    return; // Ne pas continuer si les valeurs ne sont pas valides
  }

  // Vérification si le prêt existe déjà
  if (existeDeja(montant, annee, taux)) {
    alert("Ce prêt a déjà été ajouté.");
    return; // Ne pas ajouter si le prêt existe déjà
  }

  // Calcul de la mensualité
  const mensualite = calculMensualite(montant, calculTauxMensuel(taux), annee * 12); 
  comparaisons.push({ montant, annee, taux, mensualite }); // Ajout à la liste des comparaisons
  remplirTableComparaison(); // Mettre à jour le tableau

  // Effacer les champs d'entrée
  document.getElementById('inputMontantComparaison').value = '';
  document.getElementById('inputAnneeComparaison').value = '';
  document.getElementById('inputTauxComparaison').value = '';
}

// Fonction pour remplir le tableau de comparaison
function remplirTableComparaison() {
  const tableBody = document.querySelector('#tableComparaison tbody');
  tableBody.innerHTML = ''; // Vider le tableau avant de le remplir

  comparaisons.forEach(({ montant, annee, taux, mensualite }) => {
    const row = `
      <tr>
        <td>${montant.toFixed(2)}</td>
        <td>${annee}</td>
        <td>${taux.toFixed(2)}</td>
        <td>${mensualite.toFixed(2)}</td>
      </tr>
    `;
    tableBody.innerHTML += row; // Ajouter une ligne au tableau
  });
}

// Fonction pour supprimer toutes les comparaisons
function supprimerComparaisons() {
  comparaisons = []; // Vider le tableau de comparaisons
  remplirTableComparaison(); // Mettre à jour le tableau pour qu'il soit vide
}

// Ajout de l'événement pour le bouton d'ajout
document.getElementById('ajouterComparaison').addEventListener('click', ajouterComparaison);

// Ajout de l'événement pour le bouton de suppression
document.getElementById('supprimerComparaison').addEventListener('click', supprimerComparaisons);
