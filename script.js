const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}
const rarityOrder = ["Unique", "Mystical", "Chroma", "Legendary", "Epic", "Rare", "Uncommon", "Common"];
  let packOrder = [];
  for (let i = 0; i < Array.from(blooketDB.pack).length; i++)   {
    packOrder[i] = Array.from(blooketDB.pack)[i].name;
  }
  let blookCards = document.querySelectorAll('.blook-card');
  function ShowInfo(blook) {
    const a = document.createElement('div');
    a.style = "position:fixed;z-index:10;";
    const b = document.createElement('div');
    b.style = "position:fixed;width:100vw;height:100vh;background:rgba(255,255,255,0.2);top:0;left:0;z-index:8;animation-duration: 0.2s;animation-name: fade-in;backdrop-filter: blur(2px);"
    b.onclick = function() {this.remove();a.remove();};
    document.body.appendChild(b);
    var color2 = pSBC(-0.6,blook.color);
    var color1 = pSBC(0.2,blook.color)+"88";
    const img = document.createElement('img');
    img.src = blook.url;
    img.className = 'Info-BlookImage'
    a.appendChild(img);
    
    //rgba(0, 126, 219,0.5)
    const title = document.createElement('div');
    title.style = "opacity:0;--xend:0px;--yend:-150px;--bg:"+color1+";--bg2:"+color2;
    title.style.animationDelay = "0.02s";
    title.className = 'Info-InfoCard'
    title.textContent = blook.name;
    
    const chance = document.createElement('div');
    chance.style = "opacity:0;--xend:300px;--yend:-50px;--bg:"+color1+";--bg2:"+color2;
    chance.style.animationDelay = "0.12s";
    chance.className = 'Info-InfoCard'
    chance.textContent = "Chance: "+((typeof blook.chance === "number") ? blook.chance*100+"%" : blook.chance);
    
    const value = document.createElement('div');
    value.style = "opacity:0;--xend:-300px;--yend:-50px;--bg:"+color1+";--bg2:"+color2;
    value.style.animationDelay = "0.52s";
    value.className = 'Info-InfoCard'
    value.textContent = "Value: " + Math.round(1/blook.chance)*blook.pack.cost;
    
    const rar = document.createElement('div');
    rar.style = "opacity:0;--xend:300px;--yend:50px;--bg:"+color1+";--bg2:"+color2;
    rar.style.animationDelay = "0.22s";
    rar.className = 'Info-InfoCard'
    rar.textContent = "Rarity: "+blook.rarity;
    
    const pack = document.createElement('div');
    pack.style = "opacity:0;--xend:-300px;--yend:50px;--bg:"+color1+";--bg2:"+color2;
    pack.style.animationDelay = "0.42s";
    pack.className = 'Info-InfoCard'
    pack.textContent = blook.pack.name;
    
    const team = document.createElement('div');
    team.style = "opacity:0;--xend:0px;--yend:150px;--bg:"+color1+";--bg2:"+color2;
    team.style.animationDelay = "0.32s";
    team.className = 'Info-InfoCard'
    team.textContent = "Team: "+blook.teamName;
    
    document.body.appendChild(a);
    document.body.appendChild(b);
    
    a.appendChild(title)
    
    a.appendChild(chance)
    a.appendChild(rar)
    a.appendChild(team)
    a.appendChild(pack)
    a.appendChild(value)
    
    /*
    setTimeout(function() {a.appendChild(title)}, 20);
    setTimeout(function() {a.appendChild(chance)}, 120);
    setTimeout(function() {a.appendChild(rar)}, 220);
    setTimeout(function() {a.appendChild(team)}, 320);
    setTimeout(function() {a.appendChild(pack)}, 420);
    setTimeout(function() {a.appendChild(value)}, 520);
    */
  }
  function ShowInfoBox(type, value) {
    const a = document.createElement('div');
    a.style = "position:fixed;width:100vw;height:100vh;background:rgba(0,0,0,0.5);top:0;left:0;z-index:10;"
    a.onclick = function() {this.remove();b.remove()};
    
    const b = document.createElement('div');
    b.style = "position:fixed;width:auto;padding:10px;height:auto;background:white;top:50%;left:50%;transform:translateX(-50%) translateY(-50%);border-radius:20px;text-align:center;font-family:'Titan One';z-index:11;box-shadow:0 5px 10px rgba(0,0,0,0.4);";
    b.appendChild(Object.assign(document.createElement('div'), { textContent: "What is " + type + "?!", style: "font-size:30px;margin:5px;" }));
    b.appendChild(Object.assign(document.createElement('div'), { textContent: (type==="Value") ? "The ''Value'' of a blook is determined by finding the estimated amount of tokens a blooks will take to obtain." : ((type==="Chance") ? "The ''Chance'' of a blook is determined by your chance of pulling it from a pack" : "The ''Team'' of a blook is a specialized name given by blooket highlighting a unique trait from blook to blook."), style: "font-size:15px;width:400px;background:rgba(230,230,230,1);font-family:'Courier New', monospace;border-radius:5px;box-shadow:0 3px 7px rgba(0,0,0,0.2);" }));
    b.appendChild(Object.assign(document.createElement('div'), { style: "height:10px;" }));
    b.appendChild(Object.assign(document.createElement('div'), { textContent: "What is this blook's " + type + "?", style: "font-size:15px;margin:5px;" }));
    b.appendChild(Object.assign(document.createElement('div'), { textContent: value, style: "width:"+(value.length+2)+"ch;font-size:15px;background:rgba(230,230,230,1);font-family:'Courier New', monospace;border-radius:5px;box-shadow:0 3px 7px rgba(0,0,0,0.2);margin:auto;" }));
    b.appendChild(Object.assign(document.createElement('div'), { style: "height:10px;" }));
    b.appendChild(Object.assign(document.createElement('button'), { textContent: "Ok!", style: "font-size:25px;width:100px;background:rgba(230,230,230,1);border-radius:8px;font-family:'Titan One';border:solid 4px #2cc125;background:linear-gradient(0deg, rgba(62,236,54,1) 50%, rgba(29,254,125,1) 50%);color:white;text-stroke:1.5px #696763;-webkit-text-stroke:1.5px #696763;box-shadow:0 3px 7px rgba(0,0,0,0.2);transition: all 0.2s cubic-bezier(0.3, 0.2, 0.2, 1.4);cursor:pointer;", className:'okButton' , onclick: function() {a.remove();b.remove()} }));
    document.body.appendChild(a);
    
    document.body.appendChild(b);
  }

  // Function to create and display blook cards with headers for each group
  function displayBlooks(blooksArray, groupBy) {
    const container = document.getElementById('blook-container');
    container.innerHTML = ''; // Clear existing cards

    let currentGroup = ''; // Track current group header

    blooksArray.forEach(blook => {
      const groupValue = groupBy === 'pack' ? blook.packName : blook.rarity;
      // Add a header for each new group
      if (groupValue !== currentGroup) {
        currentGroup = groupValue;
        const header = document.createElement("div");
        header.className = "group-header";
        const box = document.createElement("div");
        box.className = "group-box";
        const tile = document.createElement('div');
        tile.className = "header-tile";
        tile.style.backgroundImage = "url("+((groupBy === 'rarity') ? "https://ac.blooket.com/dashclassic/assets/Array_Tile_Medieval-CA_b442C.svg" : {Aquatic:"https://ac.blooket.com/dashclassic/assets/Array_Tile_Aquatic-DGwJPWGz.svg",Arctic:"https://ac.blooket.com/dashclassic/assets/Array_Tile_Arctic-DDrKhmGU.svg",Autumn:"https://ac.blooket.com/dashclassic/assets/Array_Tile_Autumn-CqwFf-RJ.svg",Blizzard:"https://ac.blooket.com/dashclassic/assets/Array_Tile_Blizzard-1tBAxntU.svg",Bot:"https://ac.blooket.com/dashclassic/assets/Array_Tile_Bots-YTkeidrh.svg",Breakfast:"https://ac.blooket.com/dashclassic/assets/Array_Tile_Breakfast-B-1YRZrQ.svg",Dino:"https://ac.blooket.com/dashclassic/assets/Array_Tile_Dino-BBW2BSz4.svg","Farm Animal":"https://ac.blooket.com/dashclassic/assets/Array_Tile_Farm-tIM3PSNI.svg","Forest Animal":"https://ac.blooket.com/dashclassic/assets/Array_Tile_Forest-o55Ym2tr.svg","Ice Monster":"https://ac.blooket.com/dashclassic/assets/Array_Tile_Ice_Monster-CR2XHQJ_.svg",Medieval:"https://ac.blooket.com/dashclassic/assets/Array_Tile_Medieval-CA_b442C.svg",Outback:"https://ac.blooket.com/dashclassic/assets/Array_Tile_Outback-B82RC2JI.svg",Pet:"https://ac.blooket.com/dashclassic/assets/Array_Tile_Pets-C2ajWRc5.svg",Pirate:"https://ac.blooket.com/dashclassic/assets/Array_Tile_Pirate-BbgcatPA.svg",Safari:"https://ac.blooket.com/dashclassic/assets/Array_Tile_Safari-D2a8aM2f.svg",Space:"https://ac.blooket.com/dashclassic/assets/Array_Tile_Space-BmB22OdP.svg",Spooky:"https://ac.blooket.com/dashclassic/assets/Array_Tile_Spooky-BYEu7oY7.svg","Tropical Animal":"https://ac.blooket.com/dashclassic/assets/Array_Tile_Tropical-H6uvZaOa.svg",Wonderland:"https://ac.blooket.com/dashclassic/assets/Array_Tile_Wonderland-D_oloIw6.svg"}[currentGroup])+")";
        box.appendChild(tile);
        const text = document.createElement('div');
        text.textContent = currentGroup;
        text.className = "header-text";
        box.appendChild(text);
        header.appendChild(box);
        container.appendChild(header);
      }

      const blookCard = document.createElement('div');
blookCard.className = 'blook-card';
      blookCard.dataset.blookname = blook.name;
      blookCard.dataset.packname = blook.packName;
      blookCard.dataset.blookrarity = blook.rarity;
      blookCard.dataset.serial = blook.serial;

const row1 = document.createElement('div');
row1.className = 'row';
row1.style = 'margin-bottom: 5px;';

const nameBar = document.createElement('div');
nameBar.className = 'name-bar';
const nameSpan = document.createElement('span');
nameSpan.className = "nameSpan"
nameSpan.style = 'position: absolute; transform: translateY(-4px) translateX(5px); color: white; text-shadow: 0 3px 5px rgba(0,0,0,0.5);white-space: nowrap;overflow: hidden;text-overflow: ellipsis;';
nameSpan.textContent = blook.name;
nameBar.appendChild(nameSpan);

const rarityBar = document.createElement('div');
rarityBar.className = 'rarity-bar';
rarityBar.style.background = {"Common":"#d8dfed","Uncommon":"#41b427", "Rare":"#0a14fa","Epic":"#BE0000","Legendary":"#FF910F","Chroma":"#00ccff","Mystical":"#a335ee","Unique":"#3e7c7f"}[blook.rarity];
rarityBar.style.boxShadow = "0 3px 0 "+{"Common": "#b5b7ba","Uncommon": "#328a1e","Rare": "#0b1096","Epic": "#570202","Legendary": "#a35d0a","Chroma": "#00a9d4","Mystical":"#652194","Unique": "#39677E"}[blook.rarity];
const raritySpan = document.createElement('span');
raritySpan.style = 'position: absolute; color: white; text-shadow: 0 3px 5px rgba(0,0,0,0.5); width: 100%; text-align: center;';
raritySpan.textContent = blook.rarity;
rarityBar.appendChild(raritySpan);

row1.appendChild(nameBar);
row1.appendChild(rarityBar);

const packImage = document.createElement('div');
packImage.className = 'pack-image';
packImage.style.backgroundImage =  "url("+{Aquatic:"https://ac.blooket.com/dashclassic/assets/Aquatic_Pack-jzoFduWG.png",Blizzard:"https://ac.blooket.com/dashclassic/assets/Blizzard_Pack-BOoWpsti.png",Bot:"https://ac.blooket.com/dashclassic/assets/Bot_Pack-DH_cssp8.png",Breakfast:"https://ac.blooket.com/dashclassic/assets/Breakfast_Pack-Dbk28uOc.png",Dino:"https://ac.blooket.com/dashclassic/assets/Dino_Pack-DAApPtRS.png","Ice Monster":"https://ac.blooket.com/dashclassic/assets/Ice_Monsters_Pack-BkSPnfqh.png",Medieval:"https://ac.blooket.com/dashclassic/assets/Medieval_Pack-Cv60cQFL.png",Outback:"https://ac.blooket.com/dashclassic/assets/Outback_Pack-Y8OWSe8a.png",Safari:"https://ac.blooket.com/dashclassic/assets/Safari_Pack-CH238vQG.png",Space:"https://ac.blooket.com/dashclassic/assets/Space_Pack-Ck3VoVFZ.png",Spooky:"https://ac.blooket.com/dashclassic/assets/Spooky_Pack-B3my0xUo.png",Wonderland:"https://ac.blooket.com/dashclassic/assets/Wonderland_Pack-CaB8iqtb.png",Pirate:"https://ac.blooket.com/dashclassic/assets/Pirate_Pack-Uir9GffU.png",Autumn:"https://ac.blooket.com/dashclassic/assets/Autumn_Pack-C5VMbtyO.png"}[blook.pack.name.replace(' Pack', '')]+")";

const packLabel = document.createElement('div');
packLabel.className = 'pack-label';
packLabel.style.transform = "translateY(67px) translateX(6px)";
if (blook.packName.split(" ").length >= 2) {
  packLabel.style.height = "35px";
}
const packLabelSpan = document.createElement('span');
packLabelSpan.style = 'position: absolute; width: 100%; text-align: center; font-family: "Titan One"; font-size: 12px; transform: translateY(3px); color: white; text-shadow: 0 2px #17517e;';
packLabelSpan.textContent = blook.pack.name.replace(' Pack', '');
if (!["Aquatic", "Blizzard", "Bot", "Breakfast", "Dino", "Ice Monster", "Medieval", "Outback", "Safari", "Space", "Spooky", "Wonderland", "Pirate", "Autumn"].includes(blook.packName)) {
  packImage.style.display = "none";
  packLabel.style.transform = "translateY(0px) translateX(6px)"
}
packLabel.appendChild(packLabelSpan);

const serialNumber = document.createElement('div');
serialNumber.className = 'serialNumber';
serialNumber.textContent = blook.serial;
serialNumber.style.transform = "";
      
const blookImageWrapper = document.createElement('div');
blookImageWrapper.style = 'position: absolute; width: 291px; display: flex; content-align: center; place-content: center; z-index: 1;';
const blookImage = document.createElement('img');
blookImage.className = 'blook-image';
blookImage.src = blook.url
blookImage.onclick = function() {ShowInfo(blook)};
blookImageWrapper.appendChild(blookImage);

const infoDiv = document.createElement('div');
infoDiv.className = 'info';
infoDiv.textContent = 'Info';

const cardMain = document.createElement('div');
cardMain.className = 'card-main';
cardMain.style.backgroundImage = "url("+{Aquatic:"https://ac.blooket.com/dashclassic/assets/Highlighted_Background_Aquatic-CDVAa5Z1.svg",Arctic:"https://ac.blooket.com/dashclassic/assets/Highlighted_Background_Arctic-DnFet-Es.svg",Blizzard:"https://ac.blooket.com/dashclassic/assets/Highlighted_Background_Blizzard-BEOZGRo9.svg",Bot:"https://ac.blooket.com/dashclassic/assets/Highlighted_Background_Bots-CWFp85lE.svg",Breakfast:"https://ac.blooket.com/dashclassic/assets/Highlighted_Background_Breakfast-rXV3rN0C.svg",Dino:"https://ac.blooket.com/dashclassic/assets/Highlighted_Background_Dino-qvYP8NHH.svg","Farm Animal":"https://ac.blooket.com/dashclassic/assets/Highlighted_Background_Farm-Cf8P0mJz.svg","Forest Animal":"https://ac.blooket.com/dashclassic/assets/Highlighted_Background_Forest-56I9sRnu.svg",Color:"https://ac.blooket.com/dashclassic/assets/Highlighted_Background_Generic-BG3_DSfA.svg","Ice Monster":"https://ac.blooket.com/dashclassic/assets/Highlighted_Background_Ice_Monster-IrnSpiG5.svg",Medieval:"https://ac.blooket.com/dashclassic/assets/Highlighted_Background_Medieval-HAKt-8uS.svg",Outback:"https://ac.blooket.com/dashclassic/assets/Highlighted_Background_Outback-CCDUJgD9.svg",Pet:"https://ac.blooket.com/dashclassic/assets/Highlighted_Background_Pets--9tpvwHe.svg",Safari:"https://ac.blooket.com/dashclassic/assets/Highlighted_Background_Safari-Bov1ICT4.svg",Space:"https://ac.blooket.com/dashclassic/assets/Highlighted_Background_Space-BVfDeCoN.svg",Spooky:"https://ac.blooket.com/dashclassic/assets/Highlighted_Background_Spooky-BE3Q44ax.svg","Tropical Animal":"https://ac.blooket.com/dashclassic/assets/Highlighted_Background_Tropical-DV9rwhsh.svg",Wonderland:"https://ac.blooket.com/dashclassic/assets/Highlighted_Background_Wonderland-By4voe3_.svg",Pirate:"https://ac.blooket.com/dashclassic/assets/Highlighted_Background_Pirate-CrD0PKuQ.svg",Autumn:"https://ac.blooket.com/dashclassic/assets/Highlighted_Background_Autumn-p3HcOb_2.svg"}[blook.pack.name.replace(' Pack', '')]+")";

const row2 = document.createElement('div');
row2.className = 'row';
row2.style = 'gap: 18px; content-align: center; place-content: center;';

const infoBox1 = document.createElement('div');
infoBox1.className = 'info-box';
const infoBox1Img = document.createElement('img');
infoBox1Img.src = 'https://ac.blooket.com/dashclassic/assets/Token-DmrosBZF.svg';
infoBox1Img.style = 'width: 18px; height: 18px; position: absolute; transform: translateX(-32px) translateY(-25px); rotate: -37deg;';
infoBox1.appendChild(infoBox1Img);

const infoBox1Span = document.createElement('span');
infoBox1Span.style = 'height: 20px; background: #0180dd; display: block; border-radius: 8px 8px 0 0; box-shadow: 0 2px #017ad2; font-size: 13px;';
infoBox1Span.textContent = 'Value';

infoBox1.appendChild(infoBox1Span);
const infoBox1Value = document.createElement('div');
infoBox1Value.style = 'margin-top: 5px;';
infoBox1Value.textContent = Math.round(1/blook.chance)*blook.pack.cost;
infoBox1.appendChild(infoBox1Value);

const infoBox1About = document.createElement('button');
infoBox1About.style = 'width: 18px; height: 18px; position: absolute; transform: translateX(22px) translateY(-45px);background:radial-gradient(circle, rgba(200,200,200,0.5) 35%, rgba(110,110,110,0.5) 35%, rgba(110,110,110,0.5) 50%, rgba(200,200,200,0.5) 50%);border:none;border-radius:100%;font-family:Georgia, serif;color:rgba(110,110,110,1);font-size:9px;cursor:pointer;';
infoBox1About.onclick = function() {ShowInfoBox('Value',infoBox1Value.textContent);}
infoBox1About.textContent = "i"
infoBox1.appendChild(infoBox1About);

const infoBox2 = document.createElement('div');
infoBox2.className = 'info-box';
const infoBox2Span1 = document.createElement('span');
infoBox2Span1.style = 'position: absolute; font-family: "Titan One"; text-shadow: none; transform: translateX(-40px) translateY(-5px);';
infoBox2Span1.textContent = '%';
infoBox2.appendChild(infoBox2Span1);
const infoBox2Span2 = document.createElement('span');
infoBox2Span2.style = 'height: 20px; background: #0180dd; display: block; border-radius: 8px 8px 0 0; box-shadow: 0 2px #017ad2; font-size: 13px;';
infoBox2Span2.textContent = 'Chance';
infoBox2.appendChild(infoBox2Span2);
const infoBox2Value = document.createElement('div');
infoBox2Value.style = 'margin-top: 5px;';
infoBox2Value.textContent = (typeof blook.chance === "number") ? blook.chance*100+"%" : blook.chance;
infoBox2.appendChild(infoBox2Value);
const infoBox2About = document.createElement('button');
infoBox2About.style = 'width: 18px; height: 18px; position: absolute; transform: translateX(22px) translateY(-45px);background:radial-gradient(circle, rgba(200,200,200,0.5) 35%, rgba(110,110,110,0.5) 35%, rgba(110,110,110,0.5) 50%, rgba(200,200,200,0.5) 50%);border:none;border-radius:100%;font-family:Georgia, serif;color:rgba(110,110,110,1);font-size:9px;cursor:pointer;';
infoBox2About.onclick = function() {ShowInfoBox('Chance',infoBox2Value.textContent);}
infoBox2About.textContent = "i"
infoBox2.appendChild(infoBox2About);

const infoBox3 = document.createElement('div');
infoBox3.className = 'info-box';
const infoBox3Img = document.createElement('img');
infoBox3Img.src = 'https://img.icons8.com/?size=96&id=85369&format=png';
infoBox3Img.style = 'width: 18px; height: 18px; position: absolute; transform: translateX(-40px) translateY(-5px); filter: invert(1);';
infoBox3.appendChild(infoBox3Img);
const infoBox3Span = document.createElement('span');
infoBox3Span.style = 'height: 20px; background: #0180dd; display: block; border-radius: 8px 8px 0 0; box-shadow: 0 2px #017ad2; font-size: 13px;';
infoBox3Span.textContent = 'Team';
infoBox3.appendChild(infoBox3Span);
const infoBox3Value = document.createElement('div');
infoBox3Value.style = 'margin-top: 5px; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;';
infoBox3Value.textContent = blook.teamName;
infoBox3.appendChild(infoBox3Value);
const infoBox3About = document.createElement('button');
infoBox3About.style = 'width: 18px; height: 18px; position: absolute; transform: translateX(22px) translateY(-41.5px);background:radial-gradient(circle, rgba(200,200,200,0.5) 35%, rgba(110,110,110,0.5) 35%, rgba(110,110,110,0.5) 50%, rgba(200,200,200,0.5) 50%);border:none;border-radius:100%;font-family:Georgia, serif;color:rgba(110,110,110,1);font-size:9px;cursor:pointer;';
infoBox3About.onclick = function() {ShowInfoBox('Team',infoBox3Value.textContent);}
infoBox3About.textContent = "i"
infoBox3.appendChild(infoBox3About);
      
      
row2.appendChild(infoBox1);
row2.appendChild(infoBox2);
row2.appendChild(infoBox3);

blookCard.appendChild(row1);
blookCard.appendChild(packImage);
blookCard.appendChild(packLabel);
blookCard.appendChild(serialNumber);
blookCard.appendChild(blookImageWrapper);
blookCard.appendChild(infoDiv);
blookCard.appendChild(cardMain);
blookCard.appendChild(row2);

      container.appendChild(blookCard);
    });
    blookCards = document.querySelectorAll('.blook-card');
  }

  // Sorting function based on selected option with default as 'Pack'
  function sortBlooks() {
    const sortOption = document.getElementById('sort-options').value;

    if (sortOption === 'pack') {
      const blooksArray = Object.values(blooketDB.blooks);
      for (var i = 0; i < blooksArray.length; i++) {
        if (typeof blooksArray[i].packName === "undefined") {
          blooksArray[i].packName = blooksArray[i].pack["name"].replace(' Pack', '');
        };
        if (typeof blooksArray[i].serial === "undefined") {
          blooksArray[i].serial = "#"+(i+1).toString().padStart(4, '0');
        };
      }
      blooksArray.sort((a, b) => a.packName.localeCompare(b.packName));
      displayBlooks(blooksArray, 'pack');
    } else if (sortOption === 'rarity') {
      const blooksArray = Object.values(blooketDB.blooks);
      for (var i = 0; i < blooksArray.length; i++) {
        if (typeof blooksArray[i].packName === "undefined") {
          blooksArray[i].packName = blooksArray[i].pack["name"].replace(' Pack', '');
        };
        if (typeof blooksArray[i].serial === "undefined") {
          blooksArray[i].serial = "#"+(i+1).toString().padStart(4, '0');
        };
      }
      blooksArray.sort((a, b) => rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity));
      displayBlooks(blooksArray, 'rarity');
    }
  }

  // Initialize display on load with default sort by 'Pack'
  window.onload = function() {
    if (!blooketDB) {
      console.error("blooketDB could not be loaded.");
      return;
    }

    const container = document.createElement('div');
    container.id = 'blook-container';
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.justifyContent = 'center';
    document.body.appendChild(container);

    sortBlooks(); // Initial display sorted by Pack
  };
  
  const searchBar = document.getElementById('search-bar');

  searchBar.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    blookCards.forEach(card => {
      if (card.dataset.blookname.toLowerCase().includes(searchTerm) || card.dataset.packname.toLowerCase().includes(searchTerm) || card.dataset.blookrarity.toLowerCase().includes(searchTerm) || card.dataset.serial.includes(searchTerm)) {
        card.classList.remove('invisible');
      } else {
        card.classList.add('invisible');
      }
    });
      const containerChildren = document.getElementById('blook-container').children;
      for (let i = 0; i < containerChildren.length; i++) {
        if (containerChildren[i].classList.contains('group-header')) {
          if (i+1 === containerChildren.length) {
            containerChildren[i].classList.add('invisible');
          } else if (containerChildren[i+1].classList.contains('group-header')) {
            containerChildren[i].classList.add('invisible');
          } else {
            let count = 0;
            while (true) {
              count++;
              if (i+count >= containerChildren.length) {
                containerChildren[i].classList.add('invisible');
                break;
              };
              if (containerChildren[i+count].classList.contains('blook-card') && !containerChildren[i+count].classList.contains('invisible')) {
                containerChildren[i].classList.remove('invisible');
                break;
              };
              if (containerChildren[i+count].classList.contains('group-header')) {
                containerChildren[i].classList.add('invisible');
                break;
              };
            };
          };
        };
      };
  });
