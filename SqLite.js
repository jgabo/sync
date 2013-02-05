var SqLite={};
 SqLite.comand={};
 SqLite.Ok={};
 SqLite.Error={};
 SqLite.message={};
 SqLite.param={};
 SqLite.conex=null;
 SqLite.status=false;
 
 
 SqLite.ini=function(name,version,description,size)
 {
	SqLite.param.name=name;
	SqLite.param.version=version;
	SqLite.param.description=description;
	SqLite.param.size=size;
	SqLite.command.setMessages();
	if(!this.status)
	{
		this.conex=openDatabase(SqLite.param.name,SqLite.param.version,SqLite.param.description,SqLite.param.size);
		this.status=true;
	}
 }
 
 SqLite.ini=function(object)
 {
	SqLite.command.setMessages();
	SqLite.command.setParam(object);
	if(!this.status)
	{
		this.conex=openDatabase(SqLite.param.name,SqLite.param.version,SqLite.param.description,SqLite.param.size);
		this.status=true;
	}
 }
 
 SqLite.command.setParam=function(object)
 {
	SqLite.param=object;
 }
 
 SqLite.command.setMessages=function()
 {
	SqLite.message.noEnable='Base de Datos no Encontrada';
	SqLite.message.noConex='Imbosible conectar con base de Datos';
 }
 
 SqLite.commad.getConex=function()
 {
	if(SqLite.status)
		return SqLite.conex;
	else
		alert(SqLite.message.noConex);
 }
 
 SqLite.command.addTable=function(query,ok,error)
 {
	var manager=SqLite.command.getConex();
	manager.transaction(function(tx)
	{
		tx.executeSql(query,[],ok,error);
	});
 }
 
 SqLite.command.executeQuery=function(query,param,ok,error)
 {
	var manager=SqLite.command.getConex();
	manager.transaction(function(tx)
	{
		var ok_,error_;
		ok_=ok;error_=error;
		tx.executeSql(query,param,
		function(tx,rs)
		{
			var RowsArray=new Array();
			for(var i in rs.rows)
			{
				RowsArray[i]=rs.rows[i];
			}
			SqLite.Ok.fill=rs.rows.length;
			SqLite.Ok.rows=rs.rows;
			SqLite.Ok.rowsArray=RowsArray;
			ok_(SqLite.Ok);
		},
		function(tx,e)
		{
			SqLite.Error.message=e.message;
			error_(SqLite.Error);
		});
	});
 }
 
 SqLite.command.executeUpdate=function(query,param,ok,error)
 {
	var manager=SqLite.command.getConex();
	manager.transaction(function(tx)
	{
		var ok_,error_;
		ok_=ok;error_=error;
		tx.executeSql(query,param,
		function(tx,rs)
		{
			SqLite.Ok.fill=rs.rows.length;
			ok_(SqLite.Ok);
		},
		function(tx,e)
		{
			SqLite.Error.message=e.message;
			error_(SqLite.Error);
		});
	});
 }
 
 

