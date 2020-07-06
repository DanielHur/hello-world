/*!   GeneXus Java 15_0_4-113785 on July 6, 2020 19:5:29.78
*/
gx.evt.autoSkip = false;
gx.define('rwdmasterpage', false, function () {
   this.ServerClass =  "rwdmasterpage" ;
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
   this.e14042_client=function()
   {
      this.executeServerEvent("ENTER_MPAGE", true, null, false, false);
   };
   this.e15042_client=function()
   {
      this.executeServerEvent("CANCEL_MPAGE", true, null, false, false);
   };
   this.GXValidFnc = [];
   var GXValidFnc = this.GXValidFnc ;
   this.GXCtrlIds=[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,18,19,20,21,22];
   this.GXLastCtrlId =22;
   GXValidFnc[2]={fld:"",grid:0};
   GXValidFnc[3]={fld:"MAINTABLE",grid:0};
   GXValidFnc[4]={fld:"",grid:0};
   GXValidFnc[5]={fld:"",grid:0};
   GXValidFnc[6]={fld:"HEADER",grid:0};
   GXValidFnc[7]={fld:"",grid:0};
   GXValidFnc[8]={fld:"",grid:0};
   GXValidFnc[9]={fld:"APPLICATIONHEADER", format:0,grid:0};
   GXValidFnc[10]={fld:"",grid:0};
   GXValidFnc[11]={fld:"IMAGE1",grid:0};
   GXValidFnc[12]={fld:"",grid:0};
   GXValidFnc[13]={fld:"",grid:0};
   GXValidFnc[14]={fld:"RECENT",grid:0};
   GXValidFnc[15]={fld:"",grid:0};
   GXValidFnc[16]={fld:"",grid:0};
   GXValidFnc[18]={fld:"",grid:0};
   GXValidFnc[19]={fld:"",grid:0};
   GXValidFnc[20]={fld:"CONTENT",grid:0};
   GXValidFnc[21]={fld:"",grid:0};
   GXValidFnc[22]={fld:"",grid:0};
   this.Events = {"e14042_client": ["ENTER_MPAGE", true] ,"e15042_client": ["CANCEL_MPAGE", true]};
   this.EvtParms["REFRESH_MPAGE"] = [[{ctrl:'FORM_MPAGE',prop:'Caption'}],[{ctrl:'WCRECENTLINKS_MPAGE'}]];
   this.EvtParms["START_MPAGE"] = [[],[]];
   this.Initialize( );
   this.setComponent({id: "WCRECENTLINKS" ,GXClass: null , Prefix: "MPW0017" , lvl: 1 });
});
gx.createMasterPage(rwdmasterpage);
