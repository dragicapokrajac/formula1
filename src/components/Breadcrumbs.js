import { Link } from "react-router-dom";

const Breadcrumbs = (props) => {
   let crumbs = props.crumbs;
   // u let crumbs je smesten niz objekata koje smo prosledili preko props-a
   // svaki objekat predstavlja jedan breadcrumb
   // [
   //    { path: "/", label: "Home", name: "Home" },
   //    { path: "/Drivers", name: "Drivers" }
   // ]

   return (
      <div>
         {/* prolazimo kroz niz crumbs koristeci map metodu za rad sa nizovima */}
         {crumbs?.map((crumb, i) =>
            < p key={i} >
               {/* 
               kod ispod je ternarni izraz (drugi nacin pisanja if provere, jer u okviru return-a gde se renderuje prikaz tj. u JSX-u nije dozvoljen klasican nacin pisanja if uslova, kao ni for petlje)
               'i < crumbs.length - 1' je kao 'if (i < crumbs.length - 1)', a posle znaka '?' ono sto treba da se izvrsi ako je postavljeni uslov true, a posle dvotacke ':' ono sto treba da se izvrsi ako je uslov false (tj. posle ":" je else)
               */}
               {i < crumbs.length - 1
                  ? <Link to={crumb.path}>{crumb.name}</Link>
                  : <span> {crumb.name} </span>
               }
               {/* plasticni primer
                      i = 0 1 2
                         [a,b,c]
                  length  1 2 3
               */}
               {/* 
                  Zasto je length-1? 
                  Kada stavimo -1 onda nam je taj broj koji length properti vrati 2 jer je duzina 3, a 3-1 je 2.
                  Uslov kaze da poredi vrednosti indexa i sa tom vrednostu length-1, a indexi tj. pozicije u nizu se broje od 0.
                  I onda, u prvom prolasku kroz niz poredi vrednosti i=0 sa length-1=2, i vraca 'true' jer 0 jeste manje od 2,
                  i izvrsava se ono posle '?' tj. podatke ce prokazati da budu link.
                  I tako dokle god je i < length-1.
                  Kada dodje do poslednjeg indexa i=2 poredi 2<2 i vraca 'false', sto znaci da se izvrsava deo iza ':', u ovom nasem slucaju nece prikazati podatke kao link, i poslednji breadcrumb nece biti klikabilan.
                  Eto ga. Ako nesto nije jasno, objasnicu naknadno. :)
               */}
            </p>
         )}
      </div >
   );
};

export default Breadcrumbs;

//Zakomentarisan Inline CSS za mogucu buducu uprotrebu
{/* {i === 0 && <img src={require("../img/icons/icons8-helmet-50.png")} style={{ width: 5, height: "auto" }} />} */ }