
$(document).ready(function(){
    $('#form-insert').on('submit', function(event){
        
        event.preventDefault();
        let value = $('#inputText').val();
        if(value != ""){
            console.log(value);
        $.ajax({
            url:"/",
            method: 'POST',
            contentType: "json",
            data: {msg: value},
            success: function(res){
                    $('h2').html(res);
                    
                    console.log("Response: "+res.response);
            }
        }
        )
    }})
})