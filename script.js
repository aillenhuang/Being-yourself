// Première chose, ajouter un écouteur d'évenement -addEventListener- sur la page -window-,
// qui permet d'attendre le chargement total de la page avant de lancer la fonction -setup-
window.addEventListener("load", setup);

// On met toutes les réponses en liste dans des tableaux
var TableauReponse0 = ["Joy", "Sadness", "Angry", "Disgust", "Surprise", "Fear"];
var TableauReponse1 = ["Active", "Passive"];
var TableauReponse2 = ["Citrus", "Flowers and fruits", "Fresh", "Spices", "Woods"];
var TableauReponse3 = ["Cross", "Circle", "Spiral", "Square", "Triangle"];
var TableauReponse4 = ["Full of paper", "Part of paper"];
var TableauReponse5 = ["Clear", "Fuzzy", "Discontinous"];
var TableauReponse6 = ["Ear", "Eye", "Limbs", "Mouth", "Nose"];
var TableauReponse7 = ["Cold", "Fierce", "Friendly", "Introuvered", "Opened"];
var TableauReponse8 = ["Yes", "No"];
var TableauReponse9 = ["Forward", "Twisted upwords", "Repetitive", "Spiral forwards"];

// On met toutes les questions en liste dans un tableau
var TableauQuestions = ["How are you feeling now?", "I am a person __________.", "If you had to pick one which of the following smells would the best describe you?", "If you had to pick one, which of the following shapes would the best describe you?", "If you draw a self portrait the image will fill the paper or part of it?", "How does the outline of this portrait?", "Which part of the body you are most satisfaited with?", "What is your first impression for the others?", "This impression is under your control?", "If you had to pick one which kind of the lines would the best describe your living condition?"];

// On fait un tableau qui contient les tableaux..... :)
var TableauDesTableaux = [TableauReponse0, TableauReponse1, TableauReponse2, TableauReponse3, TableauReponse4, TableauReponse5, TableauReponse6, TableauReponse7, TableauReponse8, TableauReponse9];
// Et ceux la serviront à afficher ou utiliser les réponses gardées en mémoire
var TableauReponses = [];
var TableauReponsesNumbers = [];

// Le compteur qui va permettre de savoir à quel question on se trouve!
var CompteurQuestions = 0;
// Le compteur qui permet de reset la reponse quand on en choisi une autre
var CompteurReponse = 0;

var ActiveDiv;
var ReponseSelecActive = false;

var Changer4;

function setup() {
    // Lancement de la fonction des questions au chargement de la page!
    LesQuestions();
}

function LesQuestions() {
    // On récupère la div Question pour lui mettre en -innerHTML- le texte de la question numéro 0
    var Question = document.getElementById("Question");
    Question.innerHTML = TableauQuestions[CompteurQuestions];
    // Création des div qui contiennent les réponses
    for (i = 0; i < TableauDesTableaux[CompteurQuestions].length; i++) {
        var NouvelleReponse = document.createElement("div");
        // On lui donne une classe
        NouvelleReponse.classList = "Reponse";
        NouvelleReponse.innerHTML = TableauDesTableaux[CompteurQuestions][i];
        ContainerReponses.appendChild(NouvelleReponse);
    }
    // On lui applique un écouteur d'évènement "click", qui va permettre de savoir la quelle est séléctionnée
    var Reponse = document.getElementsByClassName("Reponse");
    for (i = 0; i < Reponse.length; i++) {
        Reponse[i].addEventListener("click", ReponseSelectionnee);
        Reponse[i].customIndex = i;
    }
}

function NouvelleQuestion() {
    // Le compteur de questions s'incrémente ++
    CompteurQuestions++;
    // Les réponses précédentes sont effacées pour permettre la création des nouvelles
    var Reponse = document.getElementsByClassName("Reponse");
    while (Reponse.length > 0) {
        Reponse[0].parentNode.removeChild(Reponse[0]);
    }
    // Le bouton "suivant" disparait tant qu'on à pas choisi de réponse
    var NextButton = document.getElementById("NextButton");
    NextButton.style.display = "none";
    CompteurReponse = 0;
    // Tant que le compteur de questions n'arrive pas a la fin des questions, il relance la fonction
    if (CompteurQuestions < TableauDesTableaux.length) {
        LesQuestions();
    } else {
        Results();
    }
    // Aucune réponse n'est selectionnée - on le précise pour le retour en arrière
    ReponseSelecActive = false;
}

function PrevQuestion() {
    // Le compteur de questions se baisse --
    CompteurQuestions--;
    var NextButton = document.getElementById("NextButton");
    NextButton.innerHTML = "Next question!"
    CompteurReponse = 0;
    // Supprime les réponses précédentes, selon si on à déjà selectionné une réponse ou non.
    if (ReponseSelecActive == true) {
        TableauReponsesNumbers.push();
        TableauReponsesNumbers.pop();
        TableauReponses.pop();
        TableauReponses.pop();
    } else {
        TableauReponsesNumbers.push();
        TableauReponsesNumbers.pop();
        TableauReponses.pop();
    }

    // Montre les réponses
    var ToutesLesReponses = document.getElementById("ToutesLesReponses");
    ToutesLesReponses.innerHTML = TableauReponses;
    var Reponse = document.getElementsByClassName("Reponse");
    while (Reponse.length > 0) {
        Reponse[0].parentNode.removeChild(Reponse[0]);
    }
    if (CompteurQuestions >= 0) {
        LesQuestions();
    }
}
// Lorsque la réponse est sélectionnée
function ReponseSelectionnee(event) {
    ReponseSelecActive = true;
    // Si le compteur des question est à 0 (alors il en est à la 1ere question)
    if (CompteurQuestions >= 0) {
        // Des que l'on clique sur une réponse, un compteur de réponse s'active
        CompteurReponse++;
        // Les boutons "suivant" et "précedent" deviennent visible - display="block"
        var NextButton = document.getElementById("NextButton");
        NextButton.style.display = "block";
        var PrevButton = document.getElementById("PrevButton");
        PrevButton.style.display = "block";
        // Le bouton "Suivant" possède alors un écouteur d'évènement "click", qui nous permet d'aller a la prochaine question
        NextButton.addEventListener("click", NouvelleQuestion);
        // Le bouton "Précédent" possède alors un écouteur d'évènement "click", qui nous permet de revenir à la question d'avant
        PrevButton.addEventListener("click", PrevQuestion);

        // Toutes les réponses ont un fond blanc, sauf celle qui viens d'être séléctionnée - Reponse[activeDiv.customIndex]
        var Reponse = document.getElementsByClassName("Reponse");
        for (i = 0; i < Reponse.length; i++) {
            Reponse[i].style.backgroundColor = "white";
        }
        activeDiv = event.target;
        Reponse[activeDiv.customIndex].style.backgroundColor = "Yellow";
        // Si notre compteur de réponse est égal à 2, c'est à dire si on clique sur une autre réponse,
        // alors on supprime la donnée qu'il avait enregistrée ( puisque on enregistre dans un tableau toutes les réponses de l'utilisateur)
        if (CompteurReponse == 2) {
            TableauReponsesNumbers.pop();
            TableauReponses.pop();
            CompteurReponse = 1;
        }

        // On "push" la réponse dans le tableau correspondant
        TableauReponsesNumbers.push(activeDiv.customIndex);
        // Ici, -activeDiv.innerHTML récupère le texte à l'intérieur de la réponse (pour qu'on puisse le réutiliser quand on cherchera l'adresse de l'image)
        TableauReponses.push(activeDiv.innerHTML);
        console.log(TableauReponses)

        // Montrer la réponse qui à été choisie
        var ToutesLesReponses = document.getElementById("ToutesLesReponses");
        ToutesLesReponses.innerHTML = TableauReponses;

    }
}
// La partie des résultats!
function Results() {
    var Questionnaire = document.getElementById("Questionnaire");
    Questionnaire.style.display = "none"

    // Création des images et de leurs sources correspondantes
    for (i = 0; i < 6; i++) {
        var NouvelleImage = document.createElement("img");
        NouvelleImage.classList = "ImageFinale";
        NouvelleImage.zIndex = i;
        ContainerImagesFinales.appendChild(NouvelleImage);
    }

    var ImageFinale = document.getElementsByClassName("ImageFinale");
    for (i = 0; i < ImageFinale.length; i++) {
        ImageFinale[0].src = "img/Q1/" + TableauReponses[0] + ".png";
        ImageFinale[1].src = "img/Q2/" + TableauReponses[1] + ".png";
        ImageFinale[2].src = "img/Q3/" + TableauReponses[2] + ".png";
        ImageFinale[2].id = "OeufModif";
        if (TableauReponses[4].innerHTML = "Full of paper") {
            Changer4 = "Big";
        } else {
            Changer4 = "Small";
        }

        ImageFinale[3].id = "Q4_6";
        ImageFinale[3].src = "img/Q4-6/" + TableauReponses[3] + Changer4 + TableauReponses[5] + ".png";
        ImageFinale[4].id = "Q7_9";
        ImageFinale[4].src = "img/Q7-9/" + TableauReponses[6] + TableauReponses[7] + TableauReponses[8] + ".png";
        var Last = TableauReponses[9].slice(0, 2);

        ImageFinale[5].id = "DerniereImage";
        ImageFinale[5].src = "img/Q10/" + Last + ".png";

    }
}

function Printing() {
    window.print();
}
