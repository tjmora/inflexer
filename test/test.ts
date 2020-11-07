let examples = [   
    ["tleimp·kraugs","#","tleimp·kraugs·tleimp·kraugs"],
    ["tleimp·kraugs","=#","tleimp·kraugs·-tleimp·kraugs"],
    ["tleimp·kraugs","#=","tleimp·kraugs-·tleimp·kraugs"],
    ["tleimp·kraugs","##","tleimp·kraugs·tleimp·kraugs·tleimp·kraugs"],
    ["tleimp·kraugs","#+","tleimp·kraugs·tleimp·kraugs·tleimp·kraugs"],
    ["tleimp·kraugs","=#+","tleimp·kraugs·-tleimp·kraugs·tleimp·kraugs"],
    ["tleimp·kraugs","#+=","tleimp·kraugs·tleimp·kraugs-·tleimp·kraugs"],
    ["tleimp·kraugs","#=+","tleimp·kraugs--·tleimp·kraugs"],
    ["tleimp·kraugs","=#=#","tleimp·kraugs·-tleimp·kraugs·-tleimp·kraugs"],
    ["tleimp·kraugs","#=#=","tleimp·kraugs-·tleimp·kraugs-·tleimp·kraugs"],
    ["tleimp·kraugs","=##=","tleimp·kraugs·-tleimp·kraugs·tleimp·kraugs-"],
    ["tleimp·kraugs","#==#","tleimp·kraugs·tleimp·kraugs-·-tleimp·kraugs"],
    ["tleimp·kraugs","1;","tl·tleimp·kraugs"],
    ["tleimp·kraugs","1=;","tl-·tleimp·kraugs"],
    ["tleimp·kraugs","1+;","tl·tl·tleimp·kraugs"],
    ["tleimp·kraugs","1,1;","tl·kr·tleimp·kraugs"],
    ["tleimp·kraugs",";1","tleimp·kraugs·kr"],
    ["tleimp·kraugs",";=1","tleimp·kraugs·-kr"],
    ["tleimp·kraugs",";1+","tleimp·kraugs·kr·kr"],
    ["tleimp·kraugs",";1,1","tleimp·kraugs·tl·kr"],
    ["tleimp·kraugs","2;","t·tleimp·kraugs"],
    ["tleimp·kraugs","2=;","t-·tleimp·kraugs"],
    ["tleimp·kraugs","2+;","t·t·tleimp·kraugs"],
    ["tleimp·kraugs","2,2;","t·k·tleimp·kraugs"],
    ["tleimp·kraugs",";2","tleimp·kraugs·k"],
    ["tleimp·kraugs",";=2","tleimp·kraugs·-k"],
    ["tleimp·kraugs",";2+","tleimp·kraugs·k·k"],
    ["tleimp·kraugs",";2,2","tleimp·kraugs·t·k"],
    ["tleimp·kraugs","3;","l·tleimp·kraugs"],
    ["tleimp·kraugs","3=;","l-·tleimp·kraugs"],
    ["tleimp·kraugs","3+;","l·l·tleimp·kraugs"],
    ["tleimp·kraugs","3,3;","l·r·tleimp·kraugs"],
    ["tleimp·kraugs",";3","tleimp·kraugs·r"],
    ["tleimp·kraugs",";=3","tleimp·kraugs·-r"],
    ["tleimp·kraugs",";3+","tleimp·kraugs·r·r"],
    ["tleimp·kraugs",";3,3","tleimp·kraugs·l·r"],
    ["tleimp·kraugs","4;","ei·tleimp·kraugs"],
    ["tleimp·kraugs","4~;","eit·leimp·kraugs"],
    ["tleimp·kraugs","4=;","ei-·tleimp·kraugs"],
    ["tleimp·kraugs","4+;","ei·ei·tleimp·kraugs"],
    ["tleimp·kraugs","4+~;","ei·eit·leimp·kraugs"],
    ["tleimp·kraugs","4,4;","ei·ai·tleimp·kraugs"],
    ["tleimp·kraugs","4,4~;","ei·ait·leimp·kraugs"],
    ["tleimp·kraugs",";4","tleimp·kraugs·au"],
    ["tleimp·kraugs",";~4","tleimp·kraug·sau"],
    ["tleimp·kraugs",";=4","tleimp·kraugs·-au"],
    ["tleimp·kraugs",";4+","tleimp·kraugs·au·au"],
    ["tleimp·kraugs",";~4+","tleimp·kraug·sau·au"],
    ["tleimp·kraugs",";4,4","tleimp·kraugs·ei·au"],
    ["tleimp·kraugs",";~4,4","tleimp·kraug·sei·au"],
    ["tleimp·kraugs","5;","e·tleimp·kraugs"],
    ["tleimp·kraugs","5~;","et·leimp·kraugs"],
    ["tleimp·kraugs","5=;","e-·tleimp·kraugs"],
    ["tleimp·kraugs","5+;","e·e·tleimp·kraugs"],
    ["tleimp·kraugs","5+~;","e·et·leimp·kraugs"],
    ["tleimp·kraugs","5,5;","e·a·tleimp·kraugs"],
    ["tleimp·kraugs","5,5~;","e·at·leimp·kraugs"],
    ["tleimp·kraugs",";5","tleimp·kraugs·a"],
    ["tleimp·kraugs",";~5","tleimp·kraug·sa"],
    ["tleimp·kraugs",";=5","tleimp·kraugs·-a"],
    ["tleimp·kraugs",";5+","tleimp·kraugs·a·a"],
    ["tleimp·kraugs",";~5+","tleimp·kraug·sa·a"],
    ["tleimp·kraugs",";5,5","tleimp·kraugs·e·a"],
    ["tleimp·kraugs",";~5,5","tleimp·kraug·se·a"],
    ["tleimp·kraugs","6;","i·tleimp·kraugs"],
    ["tleimp·kraugs","6~;","it·leimp·kraugs"],
    ["tleimp·kraugs","6=;","i-·tleimp·kraugs"],
    ["tleimp·kraugs","6+;","i·i·tleimp·kraugs"],
    ["tleimp·kraugs","6+~;","i·it·leimp·kraugs"],
    ["tleimp·kraugs","6,6;","i·i·tleimp·kraugs"],
    ["tleimp·kraugs","6,6~;","i·it·leimp·kraugs"],
    ["tleimp·kraugs",";6","tleimp·kraugs·u"],
    ["tleimp·kraugs",";~6","tleimp·kraug·su"],
    ["tleimp·kraugs",";=6","tleimp·kraugs·-u"],
    ["tleimp·kraugs",";6+","tleimp·kraugs·u·u"],
    ["tleimp·kraugs",";~6+","tleimp·kraug·su·u"],
    ["tleimp·kraugs",";6,6","tleimp·kraugs·i·u"],
    ["tleimp·kraugs",";~6,6","tleimp·kraug·si·u"],
    ["tleimp·kraugs","7;","mp·tleimp·kraugs"],
    ["tleimp·kraugs","7=;","mp-·tleimp·kraugs"],
    ["tleimp·kraugs","7+;","mp·mp·tleimp·kraugs"],
    ["tleimp·kraugs","7,7;","mp·gs·tleimp·kraugs"],
    ["tleimp·kraugs",";7","tleimp·kraugs·gs"],
    ["tleimp·kraugs",";=7","tleimp·kraugs·-gs"],
    ["tleimp·kraugs",";7+","tleimp·kraugs·gs·gs"],
    ["tleimp·kraugs",";7,7","tleimp·kraugs·mp·gs"],
    ["tleimp·kraugs","8;","m·tleimp·kraugs"],
    ["tleimp·kraugs","8=;","m-·tleimp·kraugs"],
    ["tleimp·kraugs","8+;","m·m·tleimp·kraugs"],
    ["tleimp·kraugs","8,8;","m·g·tleimp·kraugs"],
    ["tleimp·kraugs",";8","tleimp·kraugs·g"],
    ["tleimp·kraugs",";=8","tleimp·kraugs·-g"],
    ["tleimp·kraugs",";8+","tleimp·kraugs·g·g"],
    ["tleimp·kraugs",";8,8","tleimp·kraugs·m·g"],
    ["tleimp·kraugs","9;","p·tleimp·kraugs"],
    ["tleimp·kraugs","9=;","p-·tleimp·kraugs"],
    ["tleimp·kraugs","9+;","p·p·tleimp·kraugs"],
    ["tleimp·kraugs","9,9;","p·s·tleimp·kraugs"],
    ["tleimp·kraugs",";9","tleimp·kraugs·s"],
    ["tleimp·kraugs",";=9","tleimp·kraugs·-s"],
    ["tleimp·kraugs",";9+","tleimp·kraugs·s·s"],
    ["tleimp·kraugs",";9,9","tleimp·kraugs·p·s"],
    ["tleimp·kraugs","14;","tlei·tleimp·kraugs"],
    ["tleimp·kraugs","14~;","tleit·leimp·kraugs"],
    ["tleimp·kraugs","15=;","tle-·tleimp·kraugs"],
    ["tleimp·kraugs","16+;","tli·tli·tleimp·kraugs"],
    ["tleimp·kraugs","16+~;","tli·tlit·leimp·kraugs"],
    ["tleimp·kraugs","15,16;","tle·kru·tleimp·kraugs"],
    ["tleimp·kraugs","15,16~;","tle·krut·leimp·kraugs"],
    ["tleimp·kraugs",";14","tleimp·kraugs·krau"],
    ["tleimp·kraugs",";=15","tleimp·kraugs·-kra"],
    ["tleimp·kraugs",";16+","tleimp·kraugs·kru·kru"],
    ["tleimp·kraugs",";15,16","tleimp·kraugs·tle·kru"],
    ["tleimp·kraugs","24;","tei·tleimp·kraugs"],
    ["tleimp·kraugs","24~;","teit·leimp·kraugs"],
    ["tleimp·kraugs","25=;","te-·tleimp·kraugs"],
    ["tleimp·kraugs","26+;","ti·ti·tleimp·kraugs"],
    ["tleimp·kraugs","26+~;","ti·tit·leimp·kraugs"],
    ["tleimp·kraugs","25,26;","te·ku·tleimp·kraugs"],
    ["tleimp·kraugs","25,26~;","te·kut·leimp·kraugs"],
    ["tleimp·kraugs",";24","tleimp·kraugs·kau"],
    ["tleimp·kraugs",";=25","tleimp·kraugs·-ka"],
    ["tleimp·kraugs",";26+","tleimp·kraugs·ku·ku"],
    ["tleimp·kraugs",";25,26","tleimp·kraugs·te·ku"],
    ["tleimp·kraugs","34;","lei·tleimp·kraugs"],
    ["tleimp·kraugs","34~;","leit·leimp·kraugs"],
    ["tleimp·kraugs","35=;","le-·tleimp·kraugs"],
    ["tleimp·kraugs","36+;","li·li·tleimp·kraugs"],
    ["tleimp·kraugs","36+~;","li·lit·leimp·kraugs"],
    ["tleimp·kraugs","35,36;","le·ru·tleimp·kraugs"],
    ["tleimp·kraugs","35,36~;","le·rut·leimp·kraugs"],
    ["tleimp·kraugs",";34","tleimp·kraugs·rau"],
    ["tleimp·kraugs",";=35","tleimp·kraugs·-ra"],
    ["tleimp·kraugs",";36+","tleimp·kraugs·ru·ru"],
    ["tleimp·kraugs",";35,36","tleimp·kraugs·le·ru"],
    ["tleimp·kraugs","47;","eimp·tleimp·kraugs"],
    ["tleimp·kraugs","48=;","eim-·tleimp·kraugs"],
    ["tleimp·kraugs","49+;","eip·eip·tleimp·kraugs"],
    ["tleimp·kraugs","48,19;","eim·aus·tleimp·kraugs"],
    ["tleimp·kraugs",";47","tleimp·kraugs·augs"],
    ["tleimp·kraugs",";~47","tleimp·kraug·saugs"],
    ["tleimp·kraugs",";=48","tleimp·kraugs·-aug"],
    ["tleimp·kraugs",";49+","tleimp·kraugs·aus·aus"],
    ["tleimp·kraugs",";~49+","tleimp·kraug·saus·aus"],
    ["tleimp·kraugs",";48,49","tleimp·kraugs·eim·aus"],
    ["tleimp·kraugs",";~48,49","tleimp·kraug·seim·aus"],
    ["tleimp·kraugs","57;","emp·tleimp·kraugs"],
    ["tleimp·kraugs","58=;","em-·tleimp·kraugs"],
    ["tleimp·kraugs","59+;","ep·ep·tleimp·kraugs"],
    ["tleimp·kraugs","58,59;","em·as·tleimp·kraugs"],
    ["tleimp·kraugs",";57","tleimp·kraugs·ags"],
    ["tleimp·kraugs",";~57","tleimp·kraug·sags"],
    ["tleimp·kraugs",";=58","tleimp·kraugs·-ag"],
    ["tleimp·kraugs",";59+","tleimp·kraugs·as·as"],
    ["tleimp·kraugs",";~59+","tleimp·kraug·sas·as"],
    ["tleimp·kraugs",";58,59","tleimp·kraugs·em·as"],
    ["tleimp·kraugs",";~58,59","tleimp·kraug·sem·as"],
    ["tleimp·kraugs","67;","imp·tleimp·kraugs"],
    ["tleimp·kraugs","68=;","im-·tleimp·kraugs"],
    ["tleimp·kraugs","69+;","ip·ip·tleimp·kraugs"],
    ["tleimp·kraugs","68,69;","im·us·tleimp·kraugs"],
    ["tleimp·kraugs",";67","tleimp·kraugs·ugs"],
    ["tleimp·kraugs",";~67","tleimp·kraug·sugs"],
    ["tleimp·kraugs",";=68","tleimp·kraugs·-ug"],
    ["tleimp·kraugs",";69+","tleimp·kraugs·us·us"],
    ["tleimp·kraugs",";~69+","tleimp·kraug·sus·us"],
    ["tleimp·kraugs",";68,69","tleimp·kraugs·im·us"],
    ["tleimp·kraugs",";~68,69","tleimp·kraug·sim·us"],
    ["tleimp·kraugs","*;","tlei·tleimp·kraugs"],
    ["tleimp·kraugs","*~;","tleit·leimp·kraugs"],
    ["tleimp·kraugs","*=;","tlei-·tleimp·kraugs"],
    ["tleimp·kraugs","*+;","tlei·tlei·tleimp·kraugs"],
    ["tleimp·kraugs","*+~;","tlei·tleit·leimp·kraugs"],
    ["tleimp·kraugs","*,*;","tlei·krau·tleimp·kraugs"],
    ["tleimp·kraugs","*,*~;","tlei·kraut·leimp·kraugs"],
    ["tleimp·kraugs",";*","tleimp·kraugs·krau"],
    ["tleimp·kraugs",";=*","tleimp·kraugs·-krau"],
    ["tleimp·kraugs",";*+","tleimp·kraugs·krau·krau"],
    ["tleimp·kraugs",";*,*","tleimp·kraugs·tlei·krau"],
    ["tleimp·kraugs","**;","eimp·tleimp·kraugs"],
    ["tleimp·kraugs","**=;","eimp-·tleimp·kraugs"],
    ["tleimp·kraugs","**+;","eimp·eimp·tleimp·kraugs"],
    ["tleimp·kraugs","**,**;","eimp·augs·tleimp·kraugs"],
    ["tleimp·kraugs",";**","tleimp·kraugs·augs"],
    ["tleimp·kraugs",";~**","tleimp·kraug·saugs"],
    ["tleimp·kraugs",";=**","tleimp·kraugs·-augs"],
    ["tleimp·kraugs",";**+","tleimp·kraugs·augs·augs"],
    ["tleimp·kraugs",";~**+","tleimp·kraug·saugs·augs"],
    ["tleimp·kraugs",";**,**","tleimp·kraugs·eimp·augs"],
    ["tleimp·kraugs",";~**,**","tleimp·kraug·seimp·augs"],
    ["tleimp·kraugs","***;","tleimp·tleimp·kraugs"],
    ["tleimp·kraugs","***=;","tleimp-·tleimp·kraugs"],
    ["tleimp·kraugs","***+;","tleimp·tleimp·tleimp·kraugs"],
    ["tleimp·kraugs","***,***;","tleimp·kraugs·tleimp·kraugs"],
    ["tleimp·kraugs",";***","tleimp·kraugs·kraugs"],
    ["tleimp·kraugs",";=***","tleimp·kraugs·-kraugs"],
    ["tleimp·kraugs",";***+","tleimp·kraugs·kraugs·kraugs"],
    ["tleimp·kraugs",";***,***","tleimp·kraugs·tleimp·kraugs"],
    ["bak·zeb","*~:_~**;","bab·ak·ze·beb"],
    ["ak·ze","*~:_~**;","a·ak·ze·e"],
    ["ak·ze","*:_**;","a·ak·ze·e"],
    ["brailp·gleird·tsoint",":14;","brailp·glei·gleird·tsoint"],
    ["brailp·gleird·tsoint",":14~;","brailp·gleig·leird·tsoint"],
    ["brailp·gleird·tsoint",":25;","brailp·ge·gleird·tsoint"],
    ["brailp·gleird·tsoint",":25~;","brailp·geg·leird·tsoint"],
    ["brailp·gleird·tsoint",":36;","brailp·li·gleird·tsoint"],
    ["brailp·gleird·tsoint",":36~;","brailp·lig·leird·tsoint"],
    ["brailp·gleird·tsoint",":15,16;","brailp·gle·gli·gleird·tsoint"],
    ["brailp·gleird·tsoint",":15,16~;","brailp·gle·glig·lourd·tsoint"],
    ["brailp·gleird·tsoint",":*;","brailp·glei·gleird·tsoint"],
    ["brailp·gleird·tsoint",":*~;","brailp·gleig·leird·tsoint"],
    ["brailp·gleird·tsoint",":***;","brailp·gleird·gleird·tsoint"],
    ["brailp·gleird·tsoint",":_14;","brailp·gleird·glei·tsoint"],
    ["brailp·gleird·tsoint",":_14~;","brailp·gleird·gleit·soint"],
    ["brailp·gleird·tsoint",":_25;","brailp·gleird·ge·tsoint"],
    ["brailp·gleird·tsoint",":_25~;","brailp·gleird·get·soint"],
    ["brailp·gleird·tsoint",":_36;","brailp·gleird·li·tsoint"],
    ["brailp·gleird·tsoint",":_36~;","brailp·gleird·lit·soint"],
    ["brailp·gleird·tsoint",":_15,16;","brailp·gleird·gle·gli·tsoint"],
    ["brailp·gleird·tsoint",":_15,16~;","brailp·gleird·gle·glit·soint"],
    ["brailp·gleird·tsoint",":_*;","brailp·gleird·glei·tsoint"],
    ["brailp·gleird·tsoint",":_*~;","brailp·gleird·gleit·soint"],
    ["brailp·gleird·tsoint",":_***;","brailp·gleird·gleird·tsoint"],
    ["brailp·gleird·tsoint",";47:","brailp·gleird·eird·tsoint"],
    ["brailp·gleird·tsoint",";~47:","brailp·gleir·deird·tsoint"],
    ["brailp·gleird·tsoint",";58:","brailp·gleird·er·tsoint"],
    ["brailp·gleird·tsoint",";~58:","brailp·gleir·der·tsoint"],
    ["brailp·gleird·tsoint",";69:","brailp·gleird·id·tsoint"],
    ["brailp·gleird·tsoint",";~69:","brailp·gleir·did·tsoint"],
    ["brailp·gleird·tsoint",";48,49:","brailp·gleird·eir·eid·tsoint"],
    ["brailp·gleird·tsoint",";~48,49:","brailp·gleir·deir·eid·tsoint"],
    ["brailp·gleird·tsoint",";**:","brailp·gleird·eird·tsoint"],
    ["brailp·gleird·tsoint",";~**:","brailp·gleir·deird·tsoint"],
    ["brailp·gleird·tsoint",";***:","brailp·gleird·gleird·tsoint"],
    ["brailp·gleird·tsoint",";47_:","brailp·eird·gleird·tsoint"],
    ["brailp·gleird·tsoint",";~47_:","brail·peird·gleird·tsoint"],
    ["brailp·gleird·tsoint",";58_:","brailp·er·gleird·tsoint"],
    ["brailp·gleird·tsoint",";~58_:","brail·per·gleird·tsoint"],
    ["brailp·gleird·tsoint",";69_:","brailp·id·gleird·tsoint"],
    ["brailp·gleird·tsoint",";~69_:","brail·pid·gleird·tsoint"],
    ["brailp·gleird·tsoint",";48,49_:","brailp·eir·eid·gleird·tsoint"],
    ["brailp·gleird·tsoint",";~48,49_:","brail·peir·eid·gleird·tsoint"],
    ["brailp·gleird·tsoint",";**_:","brailp·eird·gleird·tsoint"],
    ["brailp·gleird·tsoint",";~**_:","brail·peird·gleird·tsoint"],
    ["brailp·gleird·tsoint",";***_:","brailp·gleird·gleird·tsoint"],
    ["kan·ken·kin·kon·kun",":*;","kan·ke·ken·kin·kon·kun"],
    ["kan·ken·kin·kon·kun",":_*;","kan·ken·ke·kin·kon·kun"],
    ["kan·ken·kin·kon·kun","::**;","kan·ken·in·kin·kon·kun"],
    ["kan·ken·kin·kon·kun","::_**;","kan·ken·kin·in·kon·kun"],
    ["kan·ken·kin·kon·kun",":::***;","kan·ken·kin·kon·kon·kun"],
    ["kan·ken·kin·kon·kun",":::_***;","kan·ken·kin·kon·kon·kun"],
    ["kan·ken·kin·kon·kun","::::*;","kan·ken·kin·kon·ku·kun"],
    ["kan·ken·kin·kon·kun","::::_*;","kan·ken·kin·kon·kun·ku"],
    ["kan·ken·kin·kon·kun","*:*:*;","ka·kan·ke·ken·ki·kin·kon·kun"],
    ["kan·ken·kin·kon·kun","_*:_*:_*;","kan·ka·ken·ke·kin·ki·kon·kun"],
    ["kan·ken·kin·kon·kun",";*:","kan·ken·kin·kon·ko·kun"],
    ["kan·ken·kin·kon·kun",";*_:","kan·ken·kin·ko·kon·kun"],
    ["kan·ken·kin·kon·kun",";**::","kan·ken·kin·in·kon·kun"],
    ["kan·ken·kin·kon·kun",";**_::","kan·ken·in·kin·kon·kun"],
    ["kan·ken·kin·kon·kun",";***:::","kan·ken·ken·kin·kon·kun"],
    ["kan·ken·kin·kon·kun",";***_:::","kan·ken·ken·kin·kon·kun"],
    ["kan·ken·kin·kon·kun",";*::::","kan·ka·ken·kin·kon·kun"],
    ["kan·ken·kin·kon·kun",";*_::::","ka·kan·ken·kin·kon·kun"],
    ["kan·ken·kin·kon·kun",";*:*:*","kan·ken·kin·ki·kon·ko·kun·ku"],
    ["kan·ken·kin·kon·kun",";*_:*_:*_","kan·ken·ki·kin·ko·kon·ku·kun"],
    ["kan·ken·kin·kon·kun","*,**:**,*;","ka·en·kan·ke·in·ken·kin·kon·kun"],
    ["kan·ken·kin·kon·kun",";*,**:**,*","kan·ken·kin·kon·in·ko·kun·on·ku"],
    ["sa·pó·tan·sàr",":**::**;","sa·po·pó·tan·sa·sàr"],
    ["sa·pó·tan·sàr",":**$$::$$**;","sa·pó·pó·tan·sà·sàr"],
    ["sa·pó·tan·sàr",":**~$::**~$;","sa·pó·po·tan·sà·sar"],
    ["sa·pó·tan·sàr",":_~$**::_~$**;","sa·po·pó·tan·sar·sà"],
    ["bă·bė·bī","**:14:**;","ba·bă·be·bė·bi·bī"],
    ["bă·bė·bī","%%**:%%14:**%%;","bă·bă·bė·bė·bī·bī"],
    ["bă·bė·bī","_~%**:~%14:**~%;","ba·bă·bă·bė·bī·bi"],
    ["bạ·kỏ·dũ",";**:26:**","bạ·ba·kỏ·ko·dũ·du"],
    ["bạ·kỏ·dũ",";**@@:@@26:@@**","bạ·bạ·kỏ·kỏ·dũ·dũ"],
    ["bạ·kỏ·dũ",";~@**:~@26:**","ba·bạ·ko·kỏ·dũ·du"],
    ["a·no","ke-","ke·a·no"],
    ["a·no","ke=-","ke-·a·no"],
    ["a·no","kes-","kes·a·no"],
    ["a·no","kesr-","kesr·a·no"],
    ["a·no","ke.s-","ke·sa·no"],
    ["a·no","ke._s-","ke·as·no"],
    ["a·no","kes.r-","kes·ra·no"],
    ["a·no","kes._r-","kes·ar·no"],
    ["a·no","ke.sr-","ke·sra·no"],
    ["a·no","ke._sr-","ke·asr·no"],
    ["a·no","ke.s_r-","ke·sar·no"],
    ["a·no","ke=.sr-","ke-·sra·no"],
    ["a·no","meke-","me·ke·a·no"],
    ["a·no","meke.s-","me·ke·sa·no"],
    ["a·no","meke._s-","me·ke·as·no"],
    ["a·no","ke.$2-","ke·à·no"],
    ["a·no","ke=.$4-","ke-·á·no"],
    ["a·no","ke=.$2.$4-","ke-·à·nó"],
    ["a·no","kes.%2-","kes·ă·no"],
    ["a·no","kesr.%4-","kesr·ȧ·no"],
    ["a·no","ke.s%12-","ke·sā·no"],
    ["a·no","ke.s.%12-","ke·sa·nō"],
    ["a·no","kes.r@1-","kes·rạ·no"],
    ["a·no","ke.sr@2-","ke·srả·no"],
    ["a·no","ke=.sr@3-","ke-·srã·no"],
    ["pliks·va","ke-","ke·pliks·va"],
    ["pliks·va","ke=-","ke-·pliks·va"],
    ["pliks·va","kes-","kes·pliks·va"],
    ["pliks·va","kesr-","kesr·pliks·va"],
    ["pliks·va","ke.s-","ke·spliks·va"],
    ["pliks·va","ke._s-","ke·plikss·va"],
    ["pliks·va","kes.r-","kes·rpliks·va"],
    ["pliks·va","kes._r-","kes·pliksr·va"],
    ["pliks·va","ke.sr-","ke·srpliks·va"],
    ["pliks·va","ke._sr-","ke·plikssr·va"],
    ["pliks·va","ke.s!-","ke·sliks·va"],
    ["pliks·va","kes.r!-","kes·rliks·va"],
    ["pliks·va","kes._r!-","kes·plikr·va"],
    ["pliks·va","ke.sr!-","ke·srliks·va"],
    ["pliks·va","ke._sr!-","ke·pliksr·va"],
    ["pliks·va","ke.s!!-","ke·siks·va"],
    ["pliks·va","ke._s!!-","ke·plis·va"],
    ["pliks·va","kes.r!!-","kes·riks·va"],
    ["pliks·va","kes._r!!-","kes·plir·va"],
    ["pliks·va","ke.sr!!-","ke·sriks·va"],
    ["pliks·va","ke._sr!!-","ke·plisr·va"],
    ["pliks·va","ke.s$2!-","ke·slìks·va"],
    ["pliks·va","kes.r$4!-","kes·rlíks·va"],
    ["pliks·va","ke.sr%2!-","ke·srlĭks·va"],
    ["pliks·va","ke.s%12!!-","ke·sīks·va"],
    ["pliks·va","kes.r@1!!-","kes·rịks·va"],
    ["pliks·va","ke.sr@2!!-","ke·srỉks·va"],
    ["pliks·va","meke.s@3!!-","me·ke·sĩks·va"],
    ["ra·re·ro","do.t.s.v-","do·tra·sre·vro"],
    ["ra·re·ro","do._t._s._v-","do·rat·res·rov"],
    ["ra·re·ro","do.t!.s!!.v!!!-","do·ta·se·v"],
    ["a·to","-on","a·to·on"],
    ["a·to","-=on","a·to·-on"],
    ["a·to","-son","a·to·son"],
    ["a·to","-slon","a·to·slon"],
    ["a·to","-s.on","a·tos·on"],
    ["a·to","-s_.on","a·tso·on"],
    ["a·to","-s.lon","a·tos·lon"],
    ["a·to","-s_.lon","a·tso·lon"],
    ["a·to","-sl.on","a·tosl·on"],
    ["a·to","-sl_.on","a·tslo·on"],
    ["a·to","-s_l.on","a·tsol·on"],
    ["a·to","-sl.=on","a·tosl·-on"],
    ["a·to","-onis","a·to·o·nis"],
    ["a·to","-s.onis","a·tos·o·nis"],
    ["a·to","-s_.onis","a·tso·o·nis"],
    ["a·to","-$2.on","a·tò·on"],
    ["a·to","-$4.=on","a·tó·-on"],
    ["a·to","-$2.$4.=on","à·tó·-on"],
    ["a·to","-%2.son","a·tŏ·son"],
    ["a·to","-%4.slon","a·tȯ·slon"],
    ["a·to","-%12s.on","a·tōs·on"],
    ["a·to","-%12.s.on","ā·tos·on"],
    ["a·to","-@1s.lon","a·tọs·lon"],
    ["a·to","-@2sl.on","a·tỏsl·on"],
    ["a·to","-@3sl.=on","a·tõsl·-on"],
    ["in·lerp","-on","in·lerp·on"],
    ["in·lerp","-=on","in·lerp·-on"],
    ["in·lerp","-ton","in·lerp·ton"],
    ["in·lerp","-tson","in·lerp·tson"],
    ["in·lerp","-t.on","in·lerpt·on"],
    ["in·lerp","-t_.on","in·tlerp·on"],
    ["in·lerp","-t.son","in·lerpt·son"],
    ["in·lerp","-t_.son","in·tlerp·son"],
    ["in·lerp","-ts.on","in·lerpts·on"],
    ["in·lerp","-ts_.on","in·tslerp·on"],
    ["in·lerp","-!t.on","in·lert·on"],
    ["in·lerp","-!t.son","in·lert·son"],
    ["in·lerp","-t!_.son","in·terp·son"],
    ["in·lerp","-!ts.on","in·lerts·on"],
    ["in·lerp","-ts!_.on","in·tserp·on"],
    ["in·lerp","-!!t.on","in·let·on"],
    ["in·lerp","-t!!_.on","in·terp·on"],
    ["in·lerp","-!!t.son","in·let·son"],
    ["in·lerp","-t!!_.son","in·terp·son"],
    ["in·lerp","-!!ts.on","in·lets·on"],
    ["in·lerp","-ts!!_.on","in·tserp·on"],
    ["in·lerp","-!$2t.on","in·lèrt·on"],
    ["in·lerp","-!$4t.son","in·lért·son"],
    ["in·lerp","-!%2ts.on","in·lĕrts·on"],
    ["in·lerp","-!!%12t.on","in·lēt·on"],
    ["in·lerp","-!!@1t.son","in·lẹt·son"],
    ["in·lerp","-!!@2ts.on","in·lẻts·on"],
    ["in·lerp","-!!@3ts.onis","in·lẽts·o·nis"],
    ["ra·re·ro","-t.s.v.od","rat·res·rov·od"],
    ["ra·re·ro","-t_.s_.v_.od","tra·sre·vro·od"],
    ["ra·re·ro","-t!.s!!.v!!!.od","ta·se·v·od"],
    ["plan·traks","|in|","pin·lan·traks"],
    ["plan·traks","||in|","plin·an·traks"],
    ["plan·traks","||i.n|","pli·nan·traks"],
    ["plan·traks","||in.m|","plin·man·traks"],
    ["plan·traks","|.in|","plan·tin·raks"],
    ["plan·traks","|.i.n|","plan·ti·nraks"],
    ["plan·traks","|.i.n!|","plan·ti·naks"],
    ["plan·traks","||.in|","plan·trin·aks"],
    ["plan·traks","||.i.n|","plan·tri·naks"],
    ["plan·traks","||.in.m|","plan·trin·maks"],
    ["gaf·gef·gof","|..i%12.s|","gaf·gef·gī·sof"],
    ["gaf·gef·gof","|..u.$4|","gaf·gef·gu·óf"],
    ["sreind·flaust","zi.t!-**;","zi·trei·sreind·flaust"],
    ["sreind·flaust","zi.t!-|ef.k$4|","zi·tef·kréind·flaust"],
    ["sreind·flaust","zi.t!-|ef.k$4|/pr","zef·kí·treind·flaust"],
    ["sreind·flaust","zi.t!--~or","zi·treind·flaus·tor"],
    ["sreind·flaust","||u.p|;~47","sru·peind·flaus·taust"],
    ["sreind·flaust","|u.p|-@3.el","su·preind·flãust·el"],
    ["sreind·flaust",":***;-@3.el","sreind·flaust·flãust·el"],
    ["sreind·flaust","zi-|i.n|24;-~or","zi·si·nei·sreind·flaus·tor"],
    ["sreind·flaust","zi-|i.n|24;-~or/spir","zi·zi·ni·sreind·flaus·tor"]
]

const inflexp_pattern 
    = "("
    + "(?<prefix>(((\\$|%|@)[0-9]{1,2})*[^ 0-9*\\-|.;:,_!~$%@/]*((\\$|%|@)[0-9]{1,2})*))"
    + "(?<prefixPush>(\\._?!{0,3}((\\$|%|@)[0-9]{1,2})*[^ 0-9*\\-|.;:,_!~$%@/]*((\\$|%|@)[0-9]{1,2})*!{0,3})*)"
    + "(?<prefixMagnet>(~(\\$|%|@)?)*)"
    + "(?<prefixMark>=?)"
    + "(?<!^)\\-)?"
    + "("
    + "(?<infixPlacement>(\\|){1,2})"
    + "(?<infixFirst>(((\\$|%|@)[0-9]{1,2})*[^ 0-9*\\-|.;:,_!~$%@/]*((\\$|%|@)[0-9]{1,2})*))"
    + "(?<infixRest>(\\.((\\$|%|@)[0-9]{1,2})*[^ 0-9*\\-|.;:,_!~$%@/]*((\\$|%|@)[0-9]{1,2})*)*)"
    + "\\|)?"
    + "("
    + "("
    + "(?<rightwardRepetitionFirst>(=?_?(~(\\$|%|@)?)*(\\$\\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\\$\\$|%%|@@)*(,(\\$\\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\\$\\$|%%|@@)*)*\\+?(~(\\$|%|@)?)*=?)?)"
    + "(?<rightwardRepetitionRest>(\\:(=?_?(~(\\$|%|@)?)*(\\$\\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\\$\\$|%%|@@)*(,(\\$\\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\\$\\$|%%|@@)*)*\\+?(~(\\$|%|@)?)*=?)?)*)"
    + "(?<!^|\\-);)"
    + "|"
    + "(;"
    + "(?<leftwardRepetitionFirst>(=?(~(\\$|%|@)?)*(\\$\\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\\$\\$|%%|@@)*(,(\\$\\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\\$\\$|%%|@@)*)*\\+?(~(\\$|%|@)?)*_?=?)?)"
    + "(?<leftwardRepetitionRest>(\\:(=?(~(\\$|%|@)?)*(\\$\\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\\$\\$|%%|@@)*(,(\\$\\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\\$\\$|%%|@@)*)*\\+?(~(\\$|%|@)?)*_?=?)?)*)"
    + ")"
    + "|"
    + "(?<baseRepetition>(#\\+?=?|=?#\\+?)*)"
    + ")?"
    + "(\\-"
    + "(?<suffixMark>=?)"
    + "(?<suffixMagnet>(~(\\$|%|@)?)*)"
    + "(?<suffixPush>(!{0,3}((\\$|%|@)[0-9]{1,2})*[^ 0-9*\\-|.;:,_!~$%@/]*((\\$|%|@)[0-9]{1,2})*!{0,3}_?\\.)*)"
    + "(?<suffix>(((\\$|%|@)[0-9]{1,2})*[^ 0-9*\\-|.;:,_!~$%@/]*((\\$|%|@)[0-9]{1,2})*))"
    + ")?"
    + "(/"
    + "(?<precedence>(r|i|p|s)*)"
    + ")?"

let pattern = new RegExp(inflexp_pattern, "i")

console.log("test")

examples.forEach((item) => {
   let groups = item[1].match(pattern)!.groups!
   console.log(item[1])
   console.log(groups)
})