
$(function(){setTimeout(()=>{$('#view_bengkel_francise').hide();},50);$('#merek_motor').select2({theme:"bootstrap",});$('#model_servis').select2({theme:"bootstrap",});$('#support_layanan').select2({theme:"bootstrap",});$('#tipe_bengkel').select2({theme:"bootstrap",});$('#bengkel_francise').select2({theme:"bootstrap",});$('#nama_bank').select2({theme:"bootstrap",});$('#tipe_bengkel').on('change',function(e){getFrancise(this.value);if(this.value==3){$('#view_bengkel_francise').show();}else{$('#view_bengkel_francise').hide();}});});function getFrancise(id_tipe)
{$('#bengkel_francise option').remove();$.ajax({url:siteurl+"mitra_bengkel/getFrancise",type:"post",dataType:"json",data:{id_tipe:id_tipe,_token},beforeSend(){},complete(){},success:function(msg){if(msg['type']=='success'){$.each(msg['data'],function(prop,obj){$('<option value="'+obj.id_francise+'">'+obj.nm_francise+'</option>').appendTo('#bengkel_francise');});}
else
{}}});}