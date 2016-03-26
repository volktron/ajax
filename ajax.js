var ajax = {
    x : function () {
        if (typeof XMLHttpRequest !== 'undefined') {
            return new XMLHttpRequest();
        }
        var versions = [
            "MSXML2.XmlHttp.6.0",
            "MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp"
        ];

        var xhr;
        for (var i = 0; i < versions.length; i++) {
            try {
                xhr = new ActiveXObject(versions[i]);
                break;
            } catch (e) {
            }
        }
        return xhr;
    },

    send : function (params) {
        if (params.async === undefined) {
            params.async = true;
        }
        if (params.success === undefined) {
            params.success = function(){}
        }
        var url = "";
        var query = [];
        for (var key in params.data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(params.data[key]));
        }
        if (params.method == 'GET') {
             url = params.url + (query.length ? '?' + query.join('&') : '')
        }
        else {
            url = params.url;
        }

        var x = this.x();
        x.open(params.method, url, params.async);
        x.onreadystatechange = function () {
            if (x.readyState == 4) {
                if (x.status == 200) {
                    params.success(x.responseText)
                }
                else {
                    params.error(x)
                }
            }
        };
        if (params.method == 'POST') {
            x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            x.send(query.join('&'));
        }
        else {
            x.send(null);
        }
    },

    get : function (params) {
        params.method = 'GET';
        this.send(params);
    },

    post : function (params) {
        params.method = 'POST';
        this.send(params);
    }
};
