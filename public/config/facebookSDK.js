window.fbAsyncInit = function() {
    FB.init({
      appId      : 'xxxx', // App ID
      status     : false,
      version:  'v2.4',
      cookie     : true,
      xfbml      : false  // parse XFBML
    });
};

    (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/pl_PL/all.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
