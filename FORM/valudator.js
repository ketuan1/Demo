function Validator(formSelector) {
    var _this = this;

    var formRules = {};

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    //Tạo rules:
    //1. Nếu có lỗi thì return error message
    //2. Nếu không lỗi thì return undefined
    var validatorRules = {
        required: function (value) {
            return value ? undefined : 'Vui lòng nhập ô này';
        },
        email: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập email';
        },
        min: function (min) {
            return function (value) {
                return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} kí tự`;
            }
        },
        //VD: MAX

        //     max: function(max) {
        //         return function(value) {
        //             return value.length <= max ? undefined : `Vui lòng nhập tối thiểu ${max} kí tự`;
        //       }
        // },

    };

    //lấy ra form element trong DOM thoe `formSelector`
    var formElement = document.querySelector(formSelector);

    //chỉ xử lý khi có element trong DOM
    if (formElement) {

        //lấy tất cả thẻ có attribute rules
        var inputs = formElement.querySelectorAll('[name][rules]');
        for (var input of inputs) {

            var rules = input.getAttribute('rules').split('|');
            for (var rule of rules) {

                var ruleInfo;
                var isRuleHasValue = rule.includes(':');

                if (isRuleHasValue) {
                    var ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                }
                //function rulesFunc
                var ruleFunc = validatorRules[rule];

                if (isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [ruleFunc];
                }
            }

            //lắng nghe sự kiện để validate(blur, change,...)
            input.onblur = handleValidate;
            input.oninput = handleClearError;

        }
        //hàm thực hiện validate
        function handleValidate(event) {
            var rules = formRules[event.target.name];
            var errorMessage;

            for(var rule of rules) {
                errorMessage = rule(event.target.value);
                if(errorMessage)
                break;

            }

            //Nếu có lỗi thì hiển thì ra lỗi ra UI 
            if (errorMessage) {
                var formGroup = getParent(event.target, '.form-group');

                if (formGroup) {

                    //hiện chữ màu đỏ
                    formGroup.classList.add('invalid');
                    var formMessage = formGroup.querySelector('.form-message');
                    if (formMessage) {
                        formMessage.innerText = errorMessage;
                    }
                }
            }
            return !errorMessage;
        }

        //hàm clear message lỗi
        function handleClearError(event) {
            var formGroup = getParent(event.target, '.form-group');
            if (formGroup.classList.contains('invalid')) {
                formGroup.classList.remove('invalid');
                var formMessage = formGroup.querySelector('.form-message');

                if (formMessage) {
                    formMessage.innerText = '';
                }

            }
        }

        //xử lý hành vi submit form 
        formElement.onsubmit = function (event) {
            event.preventDefault();
            var inputs = formElement.querySelectorAll('[name][rules]');
            var isValid = true;

            for (var input of inputs) {
                if (!handleValidate({ target: input })) {
                    isValid = false;
                }

            }

            //khi không có lỗi thì submit form
            if (isValid) {
                if (typeof _this.onSubmit === 'function') {
                    var enabledInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enabledInputs).reduce(function (values, input) {
                        switch (input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]');
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                              values[input.name] = input.value;

                        }
                        return values;
                    }, {});
                    //Gọi lại hàm onSubmit và trả về kèm giá trị của các thẻ trong form
                    _this.onSubmit(formValues);
                } else {
                    formElement.submit();
                }
            }
        }
    }
}