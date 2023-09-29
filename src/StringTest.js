const StringTest=()=>{
    
var daughterStatus=daughterString("roh","horsosh",0);
console.log("DaughterStaus:",daughterStatus);

function daughterString(str1,str2,index){
    
console.log("Entered daughterString function");
        if(str1.length==0)
            {
                return;
            }
        if(str2.indexOf(str1.charAt(0),index)==-1)
        {
            return false;
        }
        else{
            index=str2.indexOf(str1.charAt(0));
            str1=str1.substring(1);
            daughterString(str1,str2,index);
        }
    
}

}

