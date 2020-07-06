/*!   GeneXus Java 15_0_4-113785 on July 6, 2020 19:5:29.9
*/
gx.evt.autoSkip = false;
gx.define('promptmasterpage', false, function () {
   this.ServerClass =  "promptmasterpage" ;
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
   this.e14032_client=function()
   {
      this.executeServerEvent("ENTER_MPAGE", true, null, false, false);
   };
   this.e15032_client=function()
   {
      this.executeServerEvent("CANCEL_MPAGE", true, null, false, false);
   };
   this.GXValidFnc = [];
   var GXValidFnc = this.GXValidFnc ;
   this.GXCtrlIds=[2,8,15,18,21,24,27,28,31];
   this.GXLastCtrlId =31;
   GXValidFnc[2]={fld:"TABLE2",grid:0};
   GXValidFnc[8]={fld:"TABLE3",grid:0};
   GXValidFnc[15]={fld:"TABLE4",grid:0};
   GXValidFnc[18]={fld:"TABLE5",grid:0};
   GXValidFnc[21]={fld:"TABLE6",grid:0};
   GXValidFnc[24]={fld:"TABLE1",grid:0};
   GXValidFnc[27]={fld:"TEXTBLOCK1", format:0,grid:0};
   GXValidFnc[28]={fld:"TABLE7",grid:0};
   GXValidFnc[31]={fld:"TABLE8",grid:0};
   this.Events = {"e14032_client": ["ENTER_MPAGE", true] ,"e15032_client": ["CANCEL_MPAGE", true]};
   this.EvtParms["REFRESH_MPAGE"] = [[],[]];
   this.EvtParms["START_MPAGE"] = [[],[]];
   this.Initialize( );
});
gx.createMasterPage(promptmasterpage);
