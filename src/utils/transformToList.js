const pytania = `1. Czy robiłeś dobrze więcej niż jednej osobie w tym kręgu
2. Czy robiłeś dobrze więcej niż dwóm osoba w tym kręgu
3. Czy zaliczyłeś na urodzinach swojego młodszego brata?
4. Czy stworzyłeś kiedyś swój własny harem?
5.  Srasz?
6. Czy przelizales/ przelizalas dziewczynę swojego kumpla?
7. Czy przelizales/przelizalas kumpla swojego chłopaka?
8. Czy przelizalas/ przelizales kogoś kto był zajęty? 
9. Czy uprawiałeś seks? 
10. Czy kiedykolwiek miałeś mokry sen o Heńczok? 
11. Czy kiedyś przelizales osobę po twojej prawiej/lewej?
12. Czy kowiekoliwek grałeś w rozbieranego? 
13. Czy jesteś najlepszym wedkazem?
14. Czy kiedykolwiek jebales się na plaży obok pana co łowił ryby w morzu? 
15. Czy podglądałeś kogoś jak się jebie? 
16. Czy kiedykolwiek wbiłeś do pokoju kolegi po zielsko kiedy się jebał a lochom? 
17. Czy kiedykolwiek podsłuchiwałeś jak ktoś się jebie? 
18. Czy pierdalnoles kiedyś fikolka jak byłeś najebany? 
19. Czy pierdalnoles trapez? 
20. Czy byłaś w relacji friends with benefits 
21. Czy seks tantryczny?
22. Czy uczyłeś się masturbowac od kogoś innego? 
23. Czy ktoś uczył Cię masturbowac?`.split('\n');

export const tranformedPytania = pytania.map((el,index)=>{return({index:index, question: el.replace(/[0-9.]/g, '').trim()})});