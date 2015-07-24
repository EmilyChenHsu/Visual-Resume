function sortContributors(ghsource,sosource,sorttype,parent){
	console.log("sorting " +sorttype);

	var alldata=new Array();
    console.log("ghsource length: "+ghsource.length);
	ghsource.forEach(function(d,i){
	//for(var i=0;i<5;i++){	
        
        d3.json(d,function(error,data){
			var ic = toInt(data.issueCount);
            var cic = toInt(data.commitCount);
            var cc = toInt(data.commentCount);
            var citp=toInt(data.passCommit);
            var citf=toInt(data.failCommit);
            var cihc=toInt(data.highCentral);
            var cimc=toInt(data.medianCentral);
            var cilc=toInt(data.lowCentral);
            var ioi=toInt(data.openIssue);
            var ici=toInt(data.closeIssue);
            var im=toInt(data.mergedPR);
            var inm=toInt(data.nonmergedPR);
                      
            var ghtotal = ic + cic + cc;
            var passp=citp/(citp+citf);
            var mergep=im/(im+inm);
            alldata[i] =
                {
                	ghid:data.id,
                	name:data.name,
                	ghtotal:ghtotal,
                	ghissue:ic,
                	ghcommit:cic,
                	ghcomment:cc,
                	ghpassp:d3.round(passp,2),
                	ghmergep:d3.round(mergep,2),
                	ghfollower:data.followers,
                    soid:"",
                    sototal:0,
                    soquestion:0,
                    soanswer:0,
                    socomment:0,
                    soacceptp:0,
                    soreputation:0
                };
                console.log(i+": "+alldata[i].name);
		});
    });
    sosource.forEach(function(d){
		d3.json(d,function(error,data){
			var qc = toInt(data.questionCount);
            var ac = toInt(data.answerCount);
            var scc = toInt(data.commentCount);
            var acc=toInt(data.acceptedCount);
            var nacc=toInt(data.nonacceptedCount);
            var soname=data.displayName;        
            var sototal = qc + ac + scc;
            var acceptp=acc/(acc+nacc);
            console.log("alldata length: "+alldata.length);
            for(var i=0;i<alldata.length;i++){
            if(alldata[i].name!=undefined && alldata[i].name==soname){
            alldata[i].soid=data.id+"";
            alldata[i].sototal=sototal;
            alldata[i].soquestion=qc;
            alldata[i].soanswer=ac;
            alldata[i].socomment=scc;
            alldata[i].soacceptp=d3.round(acceptp,2); 
            alldata[i].soreputation=data.reputation;
            console.log(i+": "+alldata[i].soid);
            }
            }
		});
    });
     //   console.log("all data22: "+alldata.length);
	
    console.log("all data11: "+alldata.length);

	function byDate(a,b)
    {
    	var av=0;
    	var bv=0;
    	if(sorttype=="Activities in GitHub"){
    		av=a.ghtotal;
    		bv=b.ghtotal;
    	}
        if(sorttype=="Activities in Stack Overflow"){
            av=a.sototal;
            bv=b.sototal;
        }
        if(sorttype=="Commits in GitHub"){
            av=a.ghcommit;
            bv=b.ghcommit;
        }
    	
                      if(av < bv)
                      {
                        return -1;
                      }
                      if(av > bv)
                      {
                        return 1;
                      }
                      return 0;
    }
    alldata.sort(byDate);
    //console.log("first: "+alldata[0].name);
    var changedhtml="";
            console.log("all data: "+alldata.length);
            alldata.forEach(function(d){
                //if(sorteddata[n].name!=undefined){
                changedhtml=changedhtml+"<h3>"+alldata[d].name+"</h3>";//+"
                //<a href='javascript:tile('Data/tgh_data_"+sorteddata[n].ghid+".json', 'gh_all', null);'>GitHub</a><br>"+"
                //<a href='javascript:tile('Data/tso_data_"+sorteddata[n].soid+".json', 'so_all', null);''>Stack Overflow</a><br>";
            //}
            });

            parent.innerHTML=changedhtml;



    //return alldata;
}