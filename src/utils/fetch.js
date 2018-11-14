import {
	baseUrl,
	basePath
} from './env'
// import { removeStore } from './mUtils'
import { Toast } from 'mint-ui'
export default async(type = 'GET', path = '', data = {}, method = 'fetch') => {
	type = type.toUpperCase();
	const token = localStorage['token'] || ''
	let url = `${basePath}${baseUrl}${path}`;
	const ERR_OK = 0;
	const ERR_Reload = 10;
	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}
	if (fetch && method == 'fetch') {
		let requestConfig = {
			credentials: 'include',
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'token': token
			},
			mode: "cors",
			cache: "force-cache"
		}

		if (type == 'POST') {
			let sendConfig = '';
			sendConfig = JSON.stringify(data);
			Object.defineProperty(requestConfig, 'body', {
				value: sendConfig
			})
    }

		try {
			var response = await fetch(url, requestConfig);
      var responseJson = await response.json();
		} catch (error) {
			throw new Error(error)
		}
		if(responseJson.result == ERR_Reload){
			// window.location.href = `/#/login`;
			// removeStore('userInfo');
		}
    if(responseJson.code != ERR_OK) {
      Toast(responseJson.msg)
    }
		return responseJson
	} else {
		let requestObj;
		if (window.XMLHttpRequest) {
			requestObj = new XMLHttpRequest();
		} else {
			requestObj = new ActiveXObject;
		}

		let sendData = '';
		if (type == 'POST') {
			sendData = JSON.stringify(data);
		}

		requestObj.open(type, url, true);
		requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		requestObj.setRequestHeader("Accept", "application/json");
		requestObj.setRequestHeader("token", token);
    requestObj.send(sendData);
		return new Promise(function(resolve,reject){
			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						if(obj.result == ERR_Reload){
							// window.location.href = `/shop/login`;
							// removeStore('userInfo');
						}
            if(obj.result != ERR_OK) reject(new Error(obj.resultNote));
						resolve(obj);
					} else {
						reject(new Error(requestObj.status));
					}
				}
			}
		}).catch(function(err){
			return err.message
		})
	}
}
