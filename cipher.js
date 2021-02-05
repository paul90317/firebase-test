function getcookie(id){
    var arr=document.cookie.split('; ');
    for(var i=0;i<arr.length;i++){
        var pair=arr[i].split('=');
        if(pair[0]==id)return pair[1];
    }
}
function sha256(m)
{
    var md = forge.md.sha256.create();  
    md.start();  
    md.update(m, "utf8");  
    var c = md.digest().toHex();  
    return c;
}
function getBytes(s){
    var len=s.length/2;
    var arr=[];
    for(var j=0;j<len;j++){
        var byte=0;
        for(var k=0;k<2;k++){
            byte*=16;
            byte+=int(s[2*j+k]);
        }
        arr.push(byte);
    }
    return arr;
}
function int(c){
    if(c>=0&&c<=9){
        return parseInt(c);
    }
    switch(c){
        case 'a':return 10;
        case 'b':return 11;
        case 'c':return 12;
        case 'd':return 13;
        case 'e':return 14;
        case 'f':return 15;
    }
    return alert("error");
}
function encode(m,key){
    var shift_key=key.slice(0,16);
    var swap_key=key.slice(16,32);
    var c="";
    for(var i=0;i<m.length;i++){
        c+=String.fromCharCode((m.charCodeAt(i)+shift_key[i%16])%128);
    }
    for(var i=0;i<16;i++){
        var t=c.slice(0,swap_key[i]%c.length);
        c=c.slice(swap_key[i]%c.length);
        c+=(t);
    }
    return c;
}
function decode(cc,key){
    let shift_key=key.slice(0,16);
    let swap_key=key.slice(16,32);
    let m="";
    let c=cc.slice(0);
    for(var i=15;i>=0;i--){
        let p=c.length-swap_key[i]%c.length;
        let t=c.slice(0,p);
        c=c.slice(p);
        c+=(t);
    }
    for(let i=0;i<c.length;i++){
        let x=c.charCodeAt(i)-shift_key[i%16];
        while(x<0)x+=128;
        m+=String.fromCharCode(x);
    }
    return m;
}
