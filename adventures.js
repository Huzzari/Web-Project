function submitMessage(){
			document.getElementById("hiddenBox").innerHTML="Thanks for submitting your feedback!";
		}
		
		function goToComment(){
			document.location.href= "comment.html";
		}
		
		function goToSubscribe(){
			document.location.href= "subscribe.html";
		}
		
		function navBarCreate(){
			document.getElementById("navBar").innerHTML=''+
			'<nav class = "navbar navbar-default" style="margin-bottom:0">'+
				'<ul class = "nav navbar-nav">'+
					'<li><a href="home.html">Home</a></li>'+
					'<li><a href="aboutMe.html">About Me</a></li>'+
					'<li><a href="trip.html">About the Trip</a></li>'+
					'<li class="dropdown">'+
						'<a class="dropdown-toggle" data-toggle="dropdown" href="#">Countries'+
						'<span class="caret"></span></a>'+
						'<ul class="dropdown-menu">'+
							'<li><a href="ireland.html">Ireland</a></li>'+
							'<li><a href="scotland.html">Scotland</a></li>'+
							'<li><a href="england.html">England</a></li>'+
							'<li><a href="portugal.html">Portugal</a></li>'+
						'</ul>'+
					'</li>'+
				'</ul>'+
				'<ul class="nav navbar-nav navbar-right" style="padding-right:30px">'+
				'<!-- fix buttons so that they link to pages-->'+
					'<li style="padding-right:10px"><button class = "btn btn-primary" style="margin-top:7px" onclick="goToComment()">Comment</button></li>'+
					'<li><button class = "btn btn-success" href="home.html" style="margin-top:7px;" onclick="goToSubscribe()">Subscribe</button></li>'+
				'</ul>'+
			'</nav>';
		}
		
		
		function commentThank(){
			document.getElementById("pageContainer").innerHTML=''+
			'<div class="container">'+
			'<br>'+
			'<h3 style="text-align: center;">Thank you for your feedback</h3>'+
			'<p style="text-align: center;">You will be redirected shortly</p>'+
			'<p style="text-align: center;">(You can also click <a href="home.html">here</a> to go to the home page)</p>'+
			'</div>';
			homeRedirect();
		}
		
		function homeRedirect(){
			setTimeout("location.href = 'home.html';",3000)
		}