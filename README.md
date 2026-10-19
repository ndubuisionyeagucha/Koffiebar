# Labo 3: Componenten die samenwerken - Reflecties
**Naam:** Ndubuisi Onyeagucha

## Oefening 2: Een herbruikbare tegel
**Noteer de twee foutmeldingen met hun code. Wie bewaakt hier wat?**

1. *Foutmelding zonder label:* `NG8008: Required input 'label' from component Badge must be specified.`
   * **Wie bewaakt dit?** De Angular Template Compiler. Omdat we `input.required()` hebben gebruikt, weigert Angular de app te bouwen als we deze verplichte data vergeten mee te geven in de HTML.
2. *Foutmelding bij kleur="paars":* `TS2322: Type '"paars"' is not assignable to type '"groen" | "grijs" | "rood"'.`
   * **Wie bewaakt dit?** TypeScript. Omdat we een *Union Type* hebben gedefinieerd, controleert TypeScript of de doorgegeven string exact overeenkomt met een van de drie toegestane opties.

## Oefening 3: Bestellen
**Wat zag je bij de foute versie, en waarom (foutnummer)?**
Bij de foute versie zagen we dat het getal in de hoofding niet meeveranderde als we op "Bestel" klikten. Dit komt door fout **F2.2**. We pasten de array direct aan (mutatie via een simpele toewijzing/push), waardoor het signal geen seintje kreeg dat de data was veranderd. Zonder de `.update()` methode weet Angular niet dat de HTML opnieuw getekend moet worden.

**Waarom emit de tegel de drank en niet een gewijzigde bestelling?**
De tegel kent alleen zijn eigen drankje. Het is een "dom" component. De tegel wéét niet wat er in de rest van de bestelling zit en bezit deze state ook niet. Het is de verantwoordelijkheid van de `App` (de eigenaar van de bestelling) om de doorgestuurde drank aan de volledige bestellijst toe te voegen.

## Oefening 4: Het bonnetje
**De fooi is state. Wie bezit ze, en waarom hoort ze niet in App?**
Het `Bonnetje` bezit de state van de fooi. Dit hoort niet in de `App` thuis, omdat state altijd zo lokaal mogelijk bewaard moet worden. De `App`, de `Hoofding` en de `Drankkaart` hoeven niet te weten hoeveel fooi er is gegeven; dit is alleen relevant voor de interne berekening (het eindtotaal) binnen het `Bonnetje` zelf.

## Oefening 5: Filteren en zoeken
**Teken de componentboom van je app en schrijf bij elke component welke state ze bezit.**

* **App** (State: `bestelling`, `zoekterm`, `gekozenCategorie`)
  * **Hoofding** (State: geen, gebruikt input)
  * **Filterbalk** (State: geen, gebruikt model)
  * **Paneel** (State: geen, gebruikt ng-content)
    * **Drankkaart** (State: geen, gebruikt input)
      * **DrankTegel** (State: geen, gebruikt input)
        * **Badge** (State: geen, gebruikt input)
  * **Paneel** (State: geen)
    * **Bonnetje** (State: `fooi`)
  * **Paneel** (State: geen)
    * **Dagschotel** (State: `gerecht`, `open`, `stemmen`)

**Hoeveel componenten bezitten iets?**
Slechts 3 componenten bezitten zelf state (data via een signal): de `App`, het `Bonnetje` en de `Dagschotel`. De rest ontvangt alleen data via inputs of models.

## Oefening 7: Bugs zoeken in de Dagschotel
**Noem per fout het nummer, de regel en het symptoom waaraan je ze herkende.**

1. **F2.1: Haakjes vergeten bij een Signal**
   * *Regel:* `<h3>Dagschotel: {{ gerecht }}</h3>` in `dagschotel.html`
   * *Symptoom:* De naam van het gerecht verscheen niet op het scherm, omdat het signal zelf werd aangeroepen in plaats van de waarde uit het signal (`gerecht()`).
2. **F2.2: Array direct muteren zonder update()**
   * *Regel:* `this.stemmen().push(...)` in de functie `stem()` in `dagschotel.ts`
   * *Symptoom:* Na het klikken op "Stem" verscheen de nieuwe stem niet op het scherm, de UI update niet.
3. **F2.3: Component niet geïmporteerd**
   * *Regel:* De `@Component` decorator in `dagschotel.ts` miste de `Badge` in de `imports` array.
   * *Symptoom:* Terminal gaf een error/warning over een onbekend element `<app-badge>` en de badge toonde niet.
4. **F2.4: Foute track in een @for loop**
   * *Regel:* `@for (stem of stemmen(); track $index)` in `dagschotel.html`
   * *Symptoom:* Bij het verwijderen van een stem versprong getypte tekst in een inputveldje naar de verkeerde (volgende) persoon in de lijst. Opgelost door unieke `track stem.id` te gebruiken.
5. **F2.5: Foute property binding**
   * *Regel:* `disabled="{{ !open() }}"` op de knop in `dagschotel.html`
   * *Symptoom:* Het woord "false" werd als string doorgegeven, waardoor de knop áltijd uitgeschakeld bleef (want elke ingevulde string in een disabled attribuut telt als 'waar'). Opgelost via `[disabled]="!open()"`.
6. **F2.10: Functie in de template mist haakjes**
   * *Regel:* `(click)="sluit"` op de sluit-knop in `dagschotel.html`
   * *Symptoom:* Er gebeurde helemaal niets bij het klikken op de knop "Stemming sluiten", omdat de functie niet echt werd uitgevoerd. Opgelost met `sluit()`.
