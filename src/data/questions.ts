export type Category = 'Izuku Midoriya' | 'Bakugo' | 'Rodzina Todorokich' | 'Klasa 1A' | 'Bohaterowie' | 'Inne klasy' | 'Złoczyńcy' | 'Ciekawostki' | 'Vigilante';

export interface Question {
  id: string;
  category: Category;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const questions: Question[] = [
  // Izuku Midoriya (15)
  {
    id: 'deku-1',
    category: 'Izuku Midoriya',
    question: 'Jak nazywa się dar Izuku Midoriyi?',
    options: ['One For All', 'All For One', 'Explosion', 'Brak daru'],
    correctAnswer: 'One For All'
  },
  {
    id: 'deku-2',
    category: 'Izuku Midoriya',
    question: 'Kto przekazał dar Izuku?',
    options: ['All Might', 'Gran Torino', 'Jego matka', 'Endeavor'],
    correctAnswer: 'All Might'
  },
  {
    id: 'deku-3',
    category: 'Izuku Midoriya',
    question: 'Jaki jest numer bohatera Izuku w dzienniku?',
    options: ['9', '1', '13', '18'],
    correctAnswer: '9'
  },
  {
    id: 'deku-4',
    category: 'Izuku Midoriya',
    question: 'Jak nazywa się matka Izuku?',
    options: ['Inko', 'Mitsuki', 'Rei', 'Nemuri'],
    correctAnswer: 'Inko'
  },
  {
    id: 'deku-5',
    category: 'Izuku Midoriya',
    question: 'Jaki jest ulubiony jedzenie Izuku?',
    options: ['Katsudon', 'Ramen', 'Sushi', 'Curry'],
    correctAnswer: 'Katsudon'
  },
  {
    id: 'deku-6',
    category: 'Izuku Midoriya',
    question: 'Ile procent mocy One For All Izuku mógł bezpiecznie używać na początku treningu z Gran Torino?',
    options: ['5%', '10%', '20%', '100%'],
    correctAnswer: '5%'
  },
  {
    id: 'deku-7',
    category: 'Izuku Midoriya',
    question: 'Jaki jest styl walki, który Izuku opracował, by nie polegać tylko na rękach?',
    options: ['Shoot Style', 'Smash Style', 'Kick Style', 'Full Cowl'],
    correctAnswer: 'Shoot Style'
  },
  {
    id: 'deku-8',
    category: 'Izuku Midoriya',
    question: 'Który użytkownik One For All posiadał dar "Czarny Bicz" (Blackwhip)?',
    options: ['Daigoro Banjo', 'Nana Shimura', 'Hikage Shinomori', 'En'],
    correctAnswer: 'Daigoro Banjo'
  },
  {
    id: 'deku-9',
    category: 'Izuku Midoriya',
    question: 'Jak Izuku nazwał swój ostateczny super ruch przeciwko Overhaulowi?',
    options: ['Infinite 100%', 'United States of Smash', 'Detroit Smash', 'Delaware Smash'],
    correctAnswer: 'Infinite 100%'
  },
  {
    id: 'deku-10',
    category: 'Izuku Midoriya',
    question: 'Kto był przyjacielem z dzieciństwa, który prześladował Izuku?',
    options: ['Katsuki Bakugo', 'Shoto Todoroki', 'Tenya Iida', 'Eijiro Kirishima'],
    correctAnswer: 'Katsuki Bakugo'
  },
  {
    id: 'deku-11',
    category: 'Izuku Midoriya',
    question: 'W którym miesiącu urodził się Izuku?',
    options: ['Lipiec', 'Sierpień', 'Czerwiec', 'Kwiecień'],
    correctAnswer: 'Lipiec'
  },
  {
    id: 'deku-12',
    category: 'Izuku Midoriya',
    question: 'Jaki dar posiadał ojciec Izuku?',
    options: ['Zianie ogniem', 'Telekineza', 'Latanie', 'Super siła'],
    correctAnswer: 'Zianie ogniem'
  },
  {
    id: 'deku-13',
    category: 'Izuku Midoriya',
    question: 'Który dar pozwala Izuku unosić się w powietrzu?',
    options: ['Float', 'Fly', 'Levitate', 'Air Walk'],
    correctAnswer: 'Float'
  },
  {
    id: 'deku-14',
    category: 'Izuku Midoriya',
    question: 'Kto był 7. użytkownikiem One For All?',
    options: ['Nana Shimura', 'Toshinori Yagi', 'Daigoro Banjo', 'En'],
    correctAnswer: 'Nana Shimura'
  },
  {
    id: 'deku-15',
    category: 'Izuku Midoriya',
    question: 'Jakie słowo widnieje na koszulce, którą Izuku często nosi?',
    options: ['T-shirt', 'Dress Shirt', 'Sheets', 'Pants'],
    correctAnswer: 'T-shirt'
  },

  // Bakugo (12)
  {
    id: 'bakugo-1',
    category: 'Bakugo',
    question: 'Jakie jest imię bohaterskie Bakugo (ostateczne)?',
    options: ['Great Explosion Murder God Dynamight', 'King Explosion Murder', 'Lord Explosion', 'Bakugo'],
    correctAnswer: 'Great Explosion Murder God Dynamight'
  },
  {
    id: 'bakugo-2',
    category: 'Bakugo',
    question: 'Jak działa dar Bakugo?',
    options: ['Poci się nitrogliceryną', 'Wytwarza ogień z dłoni', 'Strzela laserami', 'Tworzy bomby'],
    correctAnswer: 'Poci się nitrogliceryną'
  },
  {
    id: 'bakugo-3',
    category: 'Bakugo',
    question: 'Kto został porwany przez Ligę Złoczyńców podczas obozu treningowego?',
    options: ['Bakugo', 'Midoriya', 'Todoroki', 'Tokoyami'],
    correctAnswer: 'Bakugo'
  },
  {
    id: 'bakugo-4',
    category: 'Bakugo',
    question: 'Jaki instrument grał Bakugo podczas festiwalu kulturowego?',
    options: ['Perkusja', 'Gitara', 'Bas', 'Wokal'],
    correctAnswer: 'Perkusja'
  },
  {
    id: 'bakugo-5',
    category: 'Bakugo',
    question: 'Jak Bakugo nazywa Midoriyę?',
    options: ['Deku', 'Izuku', 'Nerd', 'Brokuł'],
    correctAnswer: 'Deku'
  },
  {
    id: 'bakugo-6',
    category: 'Bakugo',
    question: 'Kto wygrał Festiwal Sportowy U.A.?',
    options: ['Bakugo', 'Todoroki', 'Midoriya', 'Tokoyami'],
    correctAnswer: 'Bakugo'
  },
  {
    id: 'bakugo-7',
    category: 'Bakugo',
    question: 'Z kim Bakugo odbył staż u Best Jeanista?',
    options: ['Sam', 'Z Todorokim', 'Z Midoriyą', 'Z Kirishimą'],
    correctAnswer: 'Sam'
  },
  {
    id: 'bakugo-8',
    category: 'Bakugo',
    question: 'Jaką potrawę Bakugo potrafi świetnie gotować (co zaskoczyło klasę)?',
    options: ['Curry', 'Ramen', 'Sushi', 'Pizza'],
    correctAnswer: 'Curry'
  },
  {
    id: 'bakugo-9',
    category: 'Bakugo',
    question: 'Jak nazywa się matka Bakugo?',
    options: ['Mitsuki', 'Inko', 'Rei', 'Fuyumi'],
    correctAnswer: 'Mitsuki'
  },
  {
    id: 'bakugo-10',
    category: 'Bakugo',
    question: 'Którego z bohaterów Bakugo podziwiał w dzieciństwie?',
    options: ['All Might', 'Endeavor', 'Best Jeanist', 'Crimson Riot'],
    correctAnswer: 'All Might'
  },
  {
    id: 'bakugo-11',
    category: 'Bakugo',
    question: 'Co Bakugo nosi na rękach, aby gromadzić pot?',
    options: ['Granaty', 'Rękawice bokserskie', 'Karabiny', 'Tarcze'],
    correctAnswer: 'Granaty'
  },
  {
    id: 'bakugo-12',
    category: 'Bakugo',
    question: 'Jaka jest data urodzin Bakugo?',
    options: ['20 Kwietnia', '15 Lipca', '11 Stycznia', '30 Października'],
    correctAnswer: '20 Kwietnia'
  },

  // Rodzina Todorokich (12)
  {
    id: 'todo-1',
    category: 'Rodzina Todorokich',
    question: 'Jak nazywa się ojciec Shoto?',
    options: ['Enji', 'Toshinori', 'Keigo', 'Taishiro'],
    correctAnswer: 'Enji'
  },
  {
    id: 'todo-2',
    category: 'Rodzina Todorokich',
    question: 'Który z braci Shoto okazał się być złoczyńcą Dabi?',
    options: ['Toya', 'Natsuo', 'Fuyumi', 'Tenya'],
    correctAnswer: 'Toya'
  },
  {
    id: 'todo-3',
    category: 'Rodzina Todorokich',
    question: 'Jaki dar ma Shoto?',
    options: ['Pół-Zimno Pół-Gorąco', 'Piekielny Ogień', 'Lód', 'Niebieski Ogień'],
    correctAnswer: 'Pół-Zimno Pół-Gorąco'
  },
  {
    id: 'todo-4',
    category: 'Rodzina Todorokich',
    question: 'Dlaczego Shoto ma bliznę na twarzy?',
    options: ['Matka wylała na niego wrzątek', 'Ojciec go uderzył', 'Wypadek podczas treningu', 'Urodził się z nią'],
    correctAnswer: 'Matka wylała na niego wrzątek'
  },
  {
    id: 'todo-5',
    category: 'Rodzina Todorokich',
    question: 'Co lubi jeść Shoto?',
    options: ['Zimny Soba', 'Gorący Ramen', 'Ostre Curry', 'Lody'],
    correctAnswer: 'Zimny Soba'
  },
  {
    id: 'todo-6',
    category: 'Rodzina Todorokich',
    question: 'Jak nazywa się siostra Shoto?',
    options: ['Fuyumi', 'Rei', 'Momo', 'Kyoka'],
    correctAnswer: 'Fuyumi'
  },
  {
    id: 'todo-7',
    category: 'Rodzina Todorokich',
    question: 'Jaki kolor włosów ma Shoto po lewej stronie?',
    options: ['Czerwony', 'Biały', 'Czarny', 'Niebieski'],
    correctAnswer: 'Czerwony'
  },
  {
    id: 'todo-8',
    category: 'Rodzina Todorokich',
    question: 'Jakie jest imię bohaterskie Shoto?',
    options: ['Shoto', 'IcyHot', 'Freezer Burn', 'Endeavor Jr.'],
    correctAnswer: 'Shoto'
  },
  {
    id: 'todo-9',
    category: 'Rodzina Todorokich',
    question: 'Jaki dar posiada matka Shoto?',
    options: ['Władanie lodem', 'Władanie ogniem', 'Woda', 'Śnieg'],
    correctAnswer: 'Władanie lodem'
  },
  {
    id: 'todo-10',
    category: 'Rodzina Todorokich',
    question: 'Kto jest drugim synem w rodzinie Todoroki (po Toya)?',
    options: ['Natsuo', 'Shoto', 'Fuyumi', 'Enji'],
    correctAnswer: 'Natsuo'
  },
  {
    id: 'todo-11',
    category: 'Rodzina Todorokich',
    question: 'Co Endeavor próbował stworzyć poprzez małżeństwo z Rei?',
    options: ['Idealnego następcę', 'Szczęśliwą rodzinę', 'Silniejszy ogień', 'Odporność na lód'],
    correctAnswer: 'Idealnego następcę'
  },
  {
    id: 'todo-12',
    category: 'Rodzina Todorokich',
    question: 'Jakiego koloru są płomienie Endeavora, gdy używa pełnej mocy?',
    options: ['Pomarańczowe', 'Niebieskie', 'Fioletowe', 'Zielone'],
    correctAnswer: 'Pomarańczowe'
  },

  // Klasa 1A (15)
  {
    id: '1a-1',
    category: 'Klasa 1A',
    question: 'Kto jest przewodniczącym klasy 1A?',
    options: ['Tenya Iida', 'Momo Yaoyorozu', 'Izuku Midoriya', 'Katsuki Bakugo'],
    correctAnswer: 'Tenya Iida'
  },
  {
    id: '1a-2',
    category: 'Klasa 1A',
    question: 'Jaki dar ma Ochaco Uraraka?',
    options: ['Zero Gravity', 'Float', 'Telekinesis', 'Anti-Gravity'],
    correctAnswer: 'Zero Gravity'
  },
  {
    id: '1a-3',
    category: 'Klasa 1A',
    question: 'Jakie jest imię bohaterskie Tsuyu Asui?',
    options: ['Froppy', 'Rainy', 'Kero', 'Froggy'],
    correctAnswer: 'Froppy'
  },
  {
    id: '1a-4',
    category: 'Klasa 1A',
    question: 'Co musi spożywać Momo Yaoyorozu, aby tworzyć przedmioty?',
    options: ['Lipidy (tłuszcze)', 'Cukier', 'Białko', 'Wodę'],
    correctAnswer: 'Lipidy (tłuszcze)'
  },
  {
    id: '1a-5',
    category: 'Klasa 1A',
    question: 'Kto w klasie 1A jest "zdrajcą" (okazało się to w późniejszych rozdziałach mangi)?',
    options: ['Yuga Aoyama', 'Toru Hagakure', 'Denki Kaminari', 'Koji Koda'],
    correctAnswer: 'Yuga Aoyama'
  },
  {
    id: '1a-6',
    category: 'Klasa 1A',
    question: 'Jaki dar ma Eijiro Kirishima?',
    options: ['Utwardzenie', 'Metalizacja', 'Skała', 'Diament'],
    correctAnswer: 'Utwardzenie'
  },
  {
    id: '1a-7',
    category: 'Klasa 1A',
    question: 'Co dzieje się z Kaminari, gdy zużyje za dużo prądu?',
    options: ['Głupieje', 'Mdleje', 'Płonie', 'Zasypia'],
    correctAnswer: 'Głupieje'
  },
  {
    id: '1a-8',
    category: 'Klasa 1A',
    question: 'Kto ma dar "Dark Shadow"?',
    options: ['Fumikage Tokoyami', 'Mashirao Ojiro', 'Hanta Sero', 'Mezo Shoji'],
    correctAnswer: 'Fumikage Tokoyami'
  },
  {
    id: '1a-9',
    category: 'Klasa 1A',
    question: 'Jak nazywa się dar Minoru Minety?',
    options: ['Pop Off', 'Sticky Balls', 'Grape Juice', 'Adhesion'],
    correctAnswer: 'Pop Off'
  },
  {
    id: '1a-10',
    category: 'Klasa 1A',
    question: 'Kto w klasie 1A jest niewidzialny?',
    options: ['Toru Hagakure', 'Mina Ashido', 'Kyoka Jiro', 'Tsuyu Asui'],
    correctAnswer: 'Toru Hagakure'
  },
  {
    id: '1a-11',
    category: 'Klasa 1A',
    question: 'Z czego strzela Hanta Sero?',
    options: ['Z łokci', 'Z dłoni', 'Z kolan', 'Z ust'],
    correctAnswer: 'Z łokci'
  },
  {
    id: '1a-12',
    category: 'Klasa 1A',
    question: 'Jaki dar ma Mina Ashido?',
    options: ['Kwas', 'Trucizna', 'Szlam', 'Różowa Mgła'],
    correctAnswer: 'Kwas'
  },
  {
    id: '1a-13',
    category: 'Klasa 1A',
    question: 'Co ma na końcach uszu Kyoka Jiro?',
    options: ['Wtyczki Jack', 'Głośniki', 'Mikrofony', 'Anteny'],
    correctAnswer: 'Wtyczki Jack'
  },
  {
    id: '1a-14',
    category: 'Klasa 1A',
    question: 'Z kim rozmawia Koji Koda dzięki swojemu darowi?',
    options: ['Z zwierzętami', 'Z duchami', 'Z roślinami', 'Z maszynami'],
    correctAnswer: 'Z zwierzętami'
  },
  {
    id: '1a-15',
    category: 'Klasa 1A',
    question: 'Ile ramion ma Mezo Shoji?',
    options: ['6', '4', '8', '2'],
    correctAnswer: '6'
  },

  // Bohaterowie (12)
  {
    id: 'hero-1',
    category: 'Bohaterowie',
    question: 'Kto był numerem 1 po przejściu All Mighta na emeryturę?',
    options: ['Endeavor', 'Hawks', 'Best Jeanist', 'Edgeshot'],
    correctAnswer: 'Endeavor'
  },
  {
    id: 'hero-2',
    category: 'Bohaterowie',
    question: 'Jak nazywa się nauczyciel wychowawczy klasy 1A?',
    options: ['Shota Aizawa', 'Hizashi Yamada', 'Nemuri Kayama', 'Sekijiro Kan'],
    correctAnswer: 'Shota Aizawa'
  },
  {
    id: 'hero-3',
    category: 'Bohaterowie',
    question: 'Jaki dar posiada Hawks?',
    options: ['Fierce Wings', 'Bird of Prey', 'Feather Control', 'Eagle Eye'],
    correctAnswer: 'Fierce Wings'
  },
  {
    id: 'hero-4',
    category: 'Bohaterowie',
    question: 'Kto jest dyrektorem U.A.?',
    options: ['Nezu', 'Recovery Girl', 'All Might', 'Gran Torino'],
    correctAnswer: 'Nezu'
  },
  {
    id: 'hero-5',
    category: 'Bohaterowie',
    question: 'Jakie jest prawdziwe imię All Mighta?',
    options: ['Toshinori Yagi', 'Enji Todoroki', 'Sorahiko Torino', 'Mirai Sasaki'],
    correctAnswer: 'Toshinori Yagi'
  },
  {
    id: 'hero-6',
    category: 'Bohaterowie',
    question: 'Kto posiada dar "Wymazywanie" (Erasure)?',
    options: ['Eraser Head', 'Present Mic', 'Midnight', 'Vlad King'],
    correctAnswer: 'Eraser Head'
  },
  {
    id: 'hero-7',
    category: 'Bohaterowie',
    question: 'Jak nazywa się bohaterka "Rabbit Hero"?',
    options: ['Mirko', 'Ryukyu', 'Mt. Lady', 'Midnight'],
    correctAnswer: 'Mirko'
  },
  {
    id: 'hero-8',
    category: 'Bohaterowie',
    question: 'Jaki dar ma Mt. Lady?',
    options: ['Gigantyfikacja', 'Grawitacja', 'Siła', 'Rozciąganie'],
    correctAnswer: 'Gigantyfikacja'
  },
  {
    id: 'hero-9',
    category: 'Bohaterowie',
    question: 'Kto był mentorem Mirio Togaty?',
    options: ['Sir Nighteye', 'All Might', 'Gran Torino', 'Fat Gum'],
    correctAnswer: 'Sir Nighteye'
  },
  {
    id: 'hero-10',
    category: 'Bohaterowie',
    question: 'Jak nazywa się bohater "Fat Gum"?',
    options: ['Taishiro Toyomitsu', 'Kugo Sakamata', 'Tsunagu Hakamata', 'Shinya Kamihara'],
    correctAnswer: 'Taishiro Toyomitsu'
  },
  {
    id: 'hero-11',
    category: 'Bohaterowie',
    question: 'Jaki dar posiada Present Mic?',
    options: ['Głos', 'Dźwięk', 'Radio', 'Głośnik'],
    correctAnswer: 'Głos'
  },
  {
    id: 'hero-12',
    category: 'Bohaterowie',
    question: 'Kto jest bohaterem "Ninja"?',
    options: ['Edgeshot', 'Kamui Woods', 'Best Jeanist', 'Crust'],
    correctAnswer: 'Edgeshot'
  },

  // Inne klasy (10)
  {
    id: 'other-1',
    category: 'Inne klasy',
    question: 'Kto należy do "Wielkiej Trójki" (Big Three) U.A.?',
    options: ['Mirio, Tamaki, Nejire', 'Izuku, Bakugo, Todoroki', 'Monoma, Kendo, Tetsutetsu', 'Inasa, Camie, Seiji'],
    correctAnswer: 'Mirio, Tamaki, Nejire'
  },
  {
    id: 'other-2',
    category: 'Inne klasy',
    question: 'Jaki dar ma Neito Monoma z klasy 1B?',
    options: ['Kopiowanie', 'Kradzież', 'Lustro', 'Podwajanie'],
    correctAnswer: 'Kopiowanie'
  },
  {
    id: 'other-3',
    category: 'Inne klasy',
    question: 'Kto jest przewodniczącą klasy 1B?',
    options: ['Itsuka Kendo', 'Neito Monoma', 'Tetsutetsu Tetsutetsu', 'Ibara Shiozaki'],
    correctAnswer: 'Itsuka Kendo'
  },
  {
    id: 'other-4',
    category: 'Inne klasy',
    question: 'Jaki dar ma Mirio Togata?',
    options: ['Przenikanie', 'Niewidzialność', 'Teleportacja', 'Przewidywanie'],
    correctAnswer: 'Przenikanie'
  },
  {
    id: 'other-5',
    category: 'Inne klasy',
    question: 'Jakie jest imię bohaterskie Tamakiego Amajiki?',
    options: ['Suneater', 'Lemillion', 'Nejire Chan', 'Tentacole'],
    correctAnswer: 'Suneater'
  },
  {
    id: 'other-6',
    category: 'Inne klasy',
    question: 'Z jakiej szkoły pochodzi Inasa Yoarashi?',
    options: ['Shiketsu', 'U.A.', 'Ketsubutsu', 'Isamu'],
    correctAnswer: 'Shiketsu'
  },
  {
    id: 'other-7',
    category: 'Inne klasy',
    question: 'Jaki dar ma Mei Hatsume?',
    options: ['Zoom', 'Technologia', 'Budowa', 'Skaner'],
    correctAnswer: 'Zoom'
  },
  {
    id: 'other-8',
    category: 'Inne klasy',
    question: 'Z kim walczył Kirishima podczas egzaminu na licencję (gość z mięsa)?',
    options: ['Seiji Shishikura', 'Inasa Yoarashi', 'Camie Utsushimi', 'Nagamasa Mora'],
    correctAnswer: 'Seiji Shishikura'
  },
  {
    id: 'other-9',
    category: 'Inne klasy',
    question: 'Jaki dar ma Tetsutetsu Tetsutetsu?',
    options: ['Stal', 'Żelazo', 'Kamień', 'Złoto'],
    correctAnswer: 'Stal'
  },
  {
    id: 'other-10',
    category: 'Inne klasy',
    question: 'Czego używa Ibara Shiozaki do walki?',
    options: ['Włosów (pnączy)', 'Rąk', 'Nóg', 'Oczu'],
    correctAnswer: 'Włosów (pnączy)'
  },

  // Złoczyńcy (15)
  {
    id: 'villain-1',
    category: 'Złoczyńcy',
    question: 'Kto jest przywódcą Ligi Złoczyńców?',
    options: ['Tomura Shigaraki', 'All For One', 'Dabi', 'Kurogiri'],
    correctAnswer: 'Tomura Shigaraki'
  },
  {
    id: 'villain-2',
    category: 'Złoczyńcy',
    question: 'Jaki dar ma All For One?',
    options: ['Kradzież i przekazywanie darów', 'Niszczenie wszystkiego', 'Kontrola umysłów', 'Nieśmiertelność'],
    correctAnswer: 'Kradzież i przekazywanie darów'
  },
  {
    id: 'villain-3',
    category: 'Złoczyńcy',
    question: 'Jaki dar ma Himiko Toga?',
    options: ['Transformacja (przez krew)', 'Klonowanie', 'Iluzja', 'Wampiryzm'],
    correctAnswer: 'Transformacja (przez krew)'
  },
  {
    id: 'villain-4',
    category: 'Złoczyńcy',
    question: 'Jak nazywa się prawdziwa tożsamość Dabiego?',
    options: ['Toya Todoroki', 'Natsuo Todoroki', 'Tenko Shimura', 'Kai Chisaki'],
    correctAnswer: 'Toya Todoroki'
  },
  {
    id: 'villain-5',
    category: 'Złoczyńcy',
    question: 'Kto jest liderem Shie Hassaikai?',
    options: ['Overhaul (Kai Chisaki)', 'Chronostasis', 'Mimic', 'Rappa'],
    correctAnswer: 'Overhaul (Kai Chisaki)'
  },
  {
    id: 'villain-6',
    category: 'Złoczyńcy',
    question: 'Jaki dar ma Tomura Shigaraki?',
    options: ['Rozkład (Decay)', 'Destrukcja', 'Pył', 'Starzenie'],
    correctAnswer: 'Rozkład (Decay)'
  },
  {
    id: 'villain-7',
    category: 'Złoczyńcy',
    question: 'Kto stworzył Nomu?',
    options: ['Kyudai Garaki (Doktor)', 'All For One', 'Tomura Shigaraki', 'Giran'],
    correctAnswer: 'Kyudai Garaki (Doktor)'
  },
  {
    id: 'villain-8',
    category: 'Złoczyńcy',
    question: 'Jaki dar posiada Kurogiri?',
    options: ['Warp Gate', 'Black Hole', 'Shadow', 'Teleport'],
    correctAnswer: 'Warp Gate'
  },
  {
    id: 'villain-9',
    category: 'Złoczyńcy',
    question: 'Kto jest "Zabójcą Bohaterów"?',
    options: ['Stain', 'Spinner', 'Muscular', 'Moonfish'],
    correctAnswer: 'Stain'
  },
  {
    id: 'villain-10',
    category: 'Złoczyńcy',
    question: 'Jak działa dar Staina?',
    options: ['Paraliżuje po spożyciu krwi', 'Zabija wzrokiem', 'Zwiększa prędkość', 'Ostrzy miecze'],
    correctAnswer: 'Paraliżuje po spożyciu krwi'
  },
  {
    id: 'villain-11',
    category: 'Złoczyńcy',
    question: 'Kto zabił rodziców Koty (Water Hose)?',
    options: ['Muscular', 'Dabi', 'Toga', 'Twice'],
    correctAnswer: 'Muscular'
  },
  {
    id: 'villain-12',
    category: 'Złoczyńcy',
    question: 'Jaki dar ma Twice?',
    options: ['Podwajanie', 'Klonowanie', 'Lustrzane odbicie', 'Bliźniak'],
    correctAnswer: 'Podwajanie'
  },
  {
    id: 'villain-13',
    category: 'Złoczyńcy',
    question: 'Kto używa magii (sztuczek) i kompresuje ludzi w kulki?',
    options: ['Mr. Compress', 'Spinner', 'Magne', 'Gentle Criminal'],
    correctAnswer: 'Mr. Compress'
  },
  {
    id: 'villain-14',
    category: 'Złoczyńcy',
    question: 'Z kim walczył Deku podczas Festiwalu Kultury?',
    options: ['Gentle Criminal', 'La Brava', 'Stain', 'Overhaul'],
    correctAnswer: 'Gentle Criminal'
  },
  {
    id: 'villain-15',
    category: 'Złoczyńcy',
    question: 'Jak nazywa się organizacja Re-Destro?',
    options: ['Armia Wyzwolenia Metalo-ludzi', 'Liga Złoczyńców', 'Shie Hassaikai', 'Vanguard Action Squad'],
    correctAnswer: 'Armia Wyzwolenia Metalo-ludzi'
  },

  // Ciekawostki (10)
  {
    id: 'trivia-1',
    category: 'Ciekawostki',
    question: 'Jak nazywa się autor mangi Boku no Hero Academia?',
    options: ['Kohei Horikoshi', 'Masashi Kishimoto', 'Eiichiro Oda', 'Tite Kubo'],
    correctAnswer: 'Kohei Horikoshi'
  },
  {
    id: 'trivia-2',
    category: 'Ciekawostki',
    question: 'Jaki był pierwotny projekt Deku (w one-shocie)?',
    options: ['Jack Midoriya (bez daru, z gadżetami)', 'Yamikumo', 'Sniper', 'Ninja'],
    correctAnswer: 'Jack Midoriya (bez daru, z gadżetami)'
  },
  {
    id: 'trivia-3',
    category: 'Ciekawostki',
    question: 'Ile filmów kinowych BNHA powstało do 2023 roku?',
    options: ['3', '4', '2', '5'],
    correctAnswer: '3'
  },
  {
    id: 'trivia-4',
    category: 'Ciekawostki',
    question: 'Kto jest narratorem anime (w japońskiej wersji)?',
    options: ['Izuku Midoriya', 'All Might', 'Bakugo', 'Aizawa'],
    correctAnswer: 'Izuku Midoriya'
  },
  {
    id: 'trivia-5',
    category: 'Ciekawostki',
    question: 'Jaki kolor ma krawat w mundurku męskim U.A.?',
    options: ['Czerwony', 'Zielony', 'Niebieski', 'Czarny'],
    correctAnswer: 'Czerwony'
  },
  {
    id: 'trivia-6',
    category: 'Ciekawostki',
    question: 'Jaki kształt mają źrenice Hatsume Mei?',
    options: ['Celownika', 'Serca', 'Gwiazdy', 'Kwadratu'],
    correctAnswer: 'Celownika'
  },
  {
    id: 'trivia-7',
    category: 'Ciekawostki',
    question: 'Co oznacza "Plus Ultra"?',
    options: ['Więcej niż', 'Ponad wszystko', 'Zawsze wygrywać', 'Siła ponad miarę'],
    correctAnswer: 'Więcej niż'
  },
  {
    id: 'trivia-8',
    category: 'Ciekawostki',
    question: 'Jak nazywa się kot Aizawy?',
    options: ['Nie ma kota', 'Sushi', 'Miau', 'Koty to kłamstwo'],
    correctAnswer: 'Nie ma kota'
  },
  {
    id: 'trivia-9',
    category: 'Ciekawostki',
    question: 'Który z tych bohaterów nie jest pro-bohaterem w USA?',
    options: ['All Might', 'Star and Stripe', 'Captain Celebrity', 'Cowboy'],
    correctAnswer: 'All Might'
  },
  {
    id: 'trivia-10',
    category: 'Ciekawostki',
    question: 'Ile lat ma All Might?',
    options: ['Nieznane', '40', '55', '30'],
    correctAnswer: 'Nieznane'
  },

  // Vigilante (8)
  {
    id: 'vigilante-1',
    category: 'Vigilante',
    question: 'Jak nazywa się główny bohater spin-offu Vigilantes?',
    options: ['Koichi Haimawari', 'Knuckleduster', 'Pop Step', 'Captain Celebrity'],
    correctAnswer: 'Koichi Haimawari'
  },
  {
    id: 'vigilante-2',
    category: 'Vigilante',
    question: 'Jaki dar ma Koichi (The Crawler)?',
    options: ['Ślizganie się', 'Latanie', 'Szybkość', 'Skakanie'],
    correctAnswer: 'Ślizganie się'
  },
  {
    id: 'vigilante-3',
    category: 'Vigilante',
    question: 'Kim jest Knuckleduster?',
    options: ['Byłym bohaterem bez daru', 'Złoczyńcą', 'Policjantem', 'Nauczycielem'],
    correctAnswer: 'Byłym bohaterem bez daru'
  },
  {
    id: 'vigilante-4',
    category: 'Vigilante',
    question: 'Jaki pseudonim nosi Kazuho Haneyama?',
    options: ['Pop Step', 'Queen Bee', 'Midnight', 'Eraser'],
    correctAnswer: 'Pop Step'
  },
  {
    id: 'vigilante-5',
    category: 'Vigilante',
    question: 'Kto był mentorem Koichiego?',
    options: ['Knuckleduster', 'All Might', 'Aizawa', 'Endeavor'],
    correctAnswer: 'Knuckleduster'
  },
  {
    id: 'vigilante-6',
    category: 'Vigilante',
    question: 'W jakim mieście dzieje się akcja Vigilantes?',
    options: ['Naruhata', 'Musutafu', 'Tokio', 'Hosu'],
    correctAnswer: 'Naruhata'
  },
  {
    id: 'vigilante-7',
    category: 'Vigilante',
    question: 'Jaki dar miał Knuckleduster zanim go stracił?',
    options: ['Overclock', 'Speed', 'Strength', 'Punch'],
    correctAnswer: 'Overclock'
  },
  {
    id: 'vigilante-8',
    category: 'Vigilante',
    question: 'Kto jest głównym antagonistą w Vigilantes?',
    options: ['Number 6', 'All For One', 'Stain', 'Shigaraki'],
    correctAnswer: 'Number 6'
  }
];

export const CATEGORIES: Category[] = [
  'Izuku Midoriya',
  'Bakugo',
  'Rodzina Todorokich',
  'Klasa 1A',
  'Bohaterowie',
  'Inne klasy',
  'Złoczyńcy',
  'Ciekawostki',
  'Vigilante'
];
