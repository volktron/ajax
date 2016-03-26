# ajax
I took http://stackoverflow.com/a/18078705 and changed it to kind of match a very familiar api...

## Usage
```
ajax.send({
	url : "http://localhost",
	data : {
		answer	: 42
	},
	method : "POST",
	success : function(data){
		console.log(data);
	},
	error : function(x){
		console.log(x)
	},
	async : true
})
```

## Why
Trying to go sans jQuery for a reactjs project, I found a thing on stackoverflow, and I thought it was a good solution but I like passing in a params object instead of unnamed args.
