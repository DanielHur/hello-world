/*!   GeneXus Java 15_0_4-113785 on July 6, 2020 19:5:30.33
*/
gx.evt.autoSkip = false;
gx.define('recentlinks', true, function (CmpContext) {
   this.ServerClass =  "recentlinks" ;
   this.PackageName =  "com.tesismaestria" ;
   this.setObjectType("web");
   this.setCmpContext(CmpContext);
   this.ReadonlyForm = true;
   this.hasEnterEvent = false;
   this.skipOnEnter = false;
   this.autoRefresh = true;
   this.fullAjax = true;
   this.supportAjaxEvents =  true ;
   this.ajaxSecurityToken =  true ;
   this.SetStandaloneVars=function()
   {
      this.AV6FormCaption=gx.fn.getControlValue("vFORMCAPTION") ;
      this.AV7FormPgmName=gx.fn.getControlValue("vFORMPGMNAME") ;
   };
   this.e13022_client=function()
   {
      this.executeServerEvent("ENTER", true, arguments[0], false, false);
   };
   this.e14022_client=function()
   {
      this.executeServerEvent("CANCEL", true, arguments[0], false, false);
   };
   this.GXValidFnc = [];
   var GXValidFnc = this.GXValidFnc ;
   this.GXCtrlIds=[2,5,10,12,14];
   this.GXLastCtrlId =14;
   this.LinksContainer = new gx.grid.grid(this, 2,"WbpLvl2",7,"Links","Links","LinksContainer",this.CmpContext,this.IsMasterPage,"recentlinks",[],true,0,true,true,0,false,false,false,"",0,"px","Nueva fila",false,false,false,null,null,false,"",false,[1,1,1,1],false,0,false,false);
   var LinksContainer = this.LinksContainer;
   LinksContainer.startRow("","","","","","");
   LinksContainer.startCell("","","","","","","37px","","","");
   LinksContainer.addTextBlock('PLACE',null,10);
   LinksContainer.endCell();
   LinksContainer.startCell("","","","","","","4px","","","td100");
   LinksContainer.addTextBlock('PIPE',null,12);
   LinksContainer.endCell();
   LinksContainer.endRow();
   this.LinksContainer.emptyText = "";
   this.setGrid(LinksContainer);
   GXValidFnc[2]={fld:"TABLE",grid:0};
   GXValidFnc[5]={fld:"RECENTTEXT", format:0,grid:0};
   GXValidFnc[10]={fld:"PLACE", format:0,grid:7};
   GXValidFnc[12]={fld:"PIPE", format:0,grid:7};
   GXValidFnc[14]={fld:"BOTTOMLINE",grid:0};
   this.AV6FormCaption = "" ;
   this.AV7FormPgmName = "" ;
   this.Events = {"e13022_client": ["ENTER", true] ,"e14022_client": ["CANCEL", true]};
   this.EvtParms["REFRESH"] = [[{av:'LINKS_nFirstRecordOnPage',nv:0},{av:'LINKS_nEOF',nv:0},{av:'AV6FormCaption',fld:'vFORMCAPTION',pic:'',nv:''},{av:'sPrefix',nv:''}],[]];
   this.EvtParms["START"] = [[],[{av:'gx.fn.getCtrlProperty("PIPE","Caption")',ctrl:'PIPE',prop:'Caption'}]];
   this.EvtParms["LINKS.LOAD"] = [[{av:'AV6FormCaption',fld:'vFORMCAPTION',pic:'',nv:''}],[{av:'gx.fn.getCtrlProperty("PLACE","Caption")',ctrl:'PLACE',prop:'Caption'},{av:'gx.fn.getCtrlProperty("PLACE","Link")',ctrl:'PLACE',prop:'Link'}]];
   this.setVCMap("AV6FormCaption", "vFORMCAPTION", 0, "char");
   this.setVCMap("AV7FormPgmName", "vFORMPGMNAME", 0, "svchar");
   this.setVCMap("AV6FormCaption", "vFORMCAPTION", 0, "char");
   LinksContainer.addRefreshingVar({rfrVar:"AV6FormCaption"});
   this.Initialize( );
});
