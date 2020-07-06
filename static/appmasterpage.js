/*!   GeneXus Java 15_0_4-113785 on July 6, 2020 19:5:29.40
*/
gx.evt.autoSkip = false;
gx.define('appmasterpage', false, function () {
   this.ServerClass =  "appmasterpage" ;
   this.PackageName =  "com.tesismaestria" ;
   this.setObjectType("web");
   this.IsMasterPage=true;
   this.hasEnterEvent = false;
   this.skipOnEnter = false;
   this.autoRefresh = true;
   this.fullAjax = true;
   this.supportAjaxEvents =  true ;
   this.ajaxSecurityToken =  true ;
   this.SetStandaloneVars=function()
   {
   };
   this.e14012_client=function()
   {
      this.executeServerEvent("ENTER_MPAGE", true, null, false, false);
   };
   this.e15012_client=function()
   {
      this.executeServerEvent("CANCEL_MPAGE", true, null, false, false);
   };
   this.GXValidFnc = [];
   var GXValidFnc = this.GXValidFnc ;
   this.GXCtrlIds=[2,5,8,10,13,15,17,19,21,22,25,27,29,31,42,47,50];
   this.GXLastCtrlId =50;
   GXValidFnc[2]={fld:"TABLE1",grid:0};
   GXValidFnc[5]={fld:"TABLE2",grid:0};
   GXValidFnc[8]={fld:"APPLICATIONHEADER", format:0,grid:0};
   GXValidFnc[10]={fld:"TABLE3",grid:0};
   GXValidFnc[13]={fld:"ENGLISH", format:0,grid:0};
   GXValidFnc[15]={fld:"PIPE", format:0,grid:0};
   GXValidFnc[17]={fld:"SPANISH", format:0,grid:0};
   GXValidFnc[19]={fld:"PIPE2", format:0,grid:0};
   GXValidFnc[21]={fld:"PORTUGUESE", format:0,grid:0};
   GXValidFnc[22]={fld:"TABLE4",grid:0};
   GXValidFnc[25]={fld:"FIRSTTEXT", format:0,grid:0};
   GXValidFnc[27]={fld:"SECONDTEXT", format:0,grid:0};
   GXValidFnc[29]={fld:"THIRDTEXT", format:0,grid:0};
   GXValidFnc[31]={fld:"FOURTHTEXT", format:0,grid:0};
   GXValidFnc[42]={fld:"TABLE6",grid:0};
   GXValidFnc[47]={fld:"TABLE7",grid:0};
   GXValidFnc[50]={fld:"TEXTBLOCK1", format:0,grid:0};
   this.Events = {"e14012_client": ["ENTER_MPAGE", true] ,"e15012_client": ["CANCEL_MPAGE", true]};
   this.EvtParms["REFRESH_MPAGE"] = [[{ctrl:'FORM_MPAGE',prop:'Caption'}],[{ctrl:'WCRECENTLINKS_MPAGE'}]];
   this.EvtParms["START_MPAGE"] = [[],[{av:'gx.fn.getCtrlProperty("PIPE_MPAGE","Caption")',ctrl:'PIPE_MPAGE',prop:'Caption'},{av:'gx.fn.getCtrlProperty("PIPE2_MPAGE","Caption")',ctrl:'PIPE2_MPAGE',prop:'Caption'}]];
   this.Initialize( );
   this.setComponent({id: "WCRECENTLINKS" ,GXClass: null , Prefix: "MPW0034" , lvl: 1 });
});
gx.createMasterPage(appmasterpage);
