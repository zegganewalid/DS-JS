import { getValues, calculAmortissement } from './calculs.js';

let myChart; // Variable pour stocker l'instance du graphique

function remplirTableau(amortissement) {
  let totalCapitalAmorti = 0;
  let totalInteret = 0;
  let totalMensualite = 0;
  
  let html = `<thead>
    <tr>
      <th>Période</th>
      <th>Capital Amorti</th>
      <th>Intérêts</th>
      <th>Capital restant dû</th>
      <th>Mensualité</th>
    </tr>
  </thead><tbody>`;

  amortissement.forEach(({ remboursementMensuel, capitalAmorti, interet, capitalRestantDu }, index) => {
    totalCapitalAmorti += capitalAmorti;
    totalInteret += interet;
    totalMensualite += remboursementMensuel;

    const isInterestHigher = capitalAmorti < interet;

    html += `
      <tr class="${isInterestHigher ? 'danger' : ''}">
        <td>${index + 1}</td>
        <td>${capitalAmorti.toFixed(2)}</td>
        <td>${interet.toFixed(2)}</td>
        <td>${capitalRestantDu.toFixed(2)}</td>
        <td>${remboursementMensuel.toFixed(2)}</td>
      </tr>
    `;
  });

  html += `</tbody>`;
  
  html += `<tfoot>
    <tr>
      <td>Total</td>
      <td>${totalCapitalAmorti.toFixed(2)}</td>
      <td>${totalInteret.toFixed(2)}</td>
      <td></td>
      <td>${totalMensualite.toFixed(2)}</td>
    </tr>
  </tfoot>`;

  document.getElementById("inputMensualite").innerHTML = html;

  // Appeler la fonction pour dessiner le graphique et le graphique circulaire
  dessinerGraphique(amortissement);
  dessinerGraphiqueCirculaire(totalCapitalAmorti, totalInteret);
}

function dessinerGraphique(amortissement) {
  const ctx = document.getElementById('myChart').getContext('2d');
  const period = amortissement.map((_, index) => index + 1);
  const capitalAmorti = amortissement.map(item => item.capitalAmorti);
  const interets = amortissement.map(item => item.interet);
  
  const selectedMeasure = document.getElementById('selectMesures').value; // Récupérer la mesure sélectionnée

  // Définir les datasets selon la sélection
  let datasets = [];
  if (selectedMeasure === 'capitalAmorti' || selectedMeasure === 'both') {
    datasets.push({
      label: 'Capital Amorti',
      data: capitalAmorti,
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: false
    });
  }
  if (selectedMeasure === 'interets' || selectedMeasure === 'both') {
    datasets.push({
      label: 'Intérêts',
      data: interets,
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2,
      fill: false
    });
  }

  // Si un graphique existe déjà, détruisez-le avant d'en créer un nouveau
  if (myChart) {
    myChart.destroy();
  }

  // Création du graphique
  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: period,
      datasets: datasets
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Période (mois)'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Montant'
          }
        }
      }
    }
  });
}

function dessinerGraphiqueCirculaire(totalCapitalAmorti, totalInteret) {
  const ctx = document.getElementById('myPieChart').getContext('2d');

  // Définir les données pour le graphique circulaire
  const data = {
    labels: ['Capital Amorti', 'Intérêts'],
    datasets: [{
      data: [totalCapitalAmorti, totalInteret],
      backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
      borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
      borderWidth: 1
    }]
  };

  // Création du graphique circulaire
  new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Répartition des paiements'
        }
      }
    }
  });
}

document.body.addEventListener("input", (event) => {
  if (event.target.matches('.form-control')) {
    const { montant, tauxMensuel, mois, annee } = getValues();
    const amortissementM = calculAmortissement(montant, tauxMensuel, mois, annee);
    remplirTableau(amortissementM);
  }
});

// Écouter les changements dans le sélecteur de mesures
document.getElementById('selectMesures').addEventListener('change', () => {
  const { montant, tauxMensuel, mois, annee } = getValues();
  const amortissementM = calculAmortissement(montant, tauxMensuel, mois, annee);
  dessinerGraphique(amortissementM); // Redessiner le graphique
});
