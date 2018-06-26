import { dateFormat } from  "vux"
module.exports = {
    dateFormat(val,str,bool){
        if(bool){
            var d = new Date();
            d.setTime(val);
            return dateFormat(d,str);
        }
        return dateFormat(d,str);
    },
    orderStatus(status){
        let className = 'right ';
        switch (status){
            case '0':
                className += 'err';
                break;
            case '10':
                className += 'audit';
                break;
            case '20':
                className += 'success';
                break;
            case '30':
                className += 'err';
                break;
            case '40':
                className += 'audit';
                break;
            case '50':
                className += 'audit';
                break;
            case '60':
                className += 'waiting';
                break;
            case '70':
                className += 'waiting';
                break;
            case '80':
                className += 'success';
                break;
            case '90':
                className += 'err';
                break;
        }
        return className;
    }
}