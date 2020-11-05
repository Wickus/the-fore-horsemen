// Constructor function for Submiting forms
function SubmitForm(selector, options) {
	// The properties of the submit form function
	this.selector = selector;
	this.action = null;
	this.method = null;
	this.enctype = null;
	this.options = options;
	this.submitBtnTxt = null;
	// initiating the submit form actions
	this.init();
}

SubmitForm.prototype.init = function () {
	// Checking if the elememnt is a form
	if (this.selector[0].nodeName.toLowerCase() != "form") {
		console.error("SubmitForm Error: The selector is not of type form.")
		return;
	}
	// Starting relevant functions to get the form information
	this.getAction();
	this.getMethod();
	this.getEncType();
	this.events();
}

SubmitForm.prototype.getAction = function () {
	this.action = this.selector.attr("action");
}

SubmitForm.prototype.getMethod = function () {
	this.method = this.selector.get(0).method;
}

SubmitForm.prototype.getEncType = function () {
	this.enctype = this.selector.get(0).enctype;
}

// function to validate the form
SubmitForm.prototype.validForm = function () {
	var self = this;
	var selector = self.selector;
	var inputs = selector.find("[input-type]");
	var validForm = true;
	var errorMessage = "";

	inputs.each(function () {
		var dataType = $(this).attr("input-type");
		var val = $(this).val();

		$(this).removeAttr("style");

		if ($(this).prop("required") && val == "") {

			$(this).css({
				"border-color": "red"
			});

			return {
				success: false,
				message: "Please enter all required fields"
			};
		}

		switch (dataType) {
			case "text":
				if (!self.isValidText(val)) {
					validForm = false;
					errorMessage = "Invalid text entered.";
					$(this).css({
						"border-color": "red"
					});
					return false;
				}
				break;
			case "contact":
				if (!self.isValidContactNumber(val)) {
					validForm = false;
					errorMessage = "Invalid contact number entered.";
					$(this).css({
						"border-color": "red"
					});
					return false;
				}
				break;
			case "email":
				if (!self.isValidEmail(val)) {
					validForm = false;
					errorMessage = "Invalid email entered.";
					$(this).css({
						"border-color": "red"
					});
					return false;
				}
				break;
		}
	});

	return {
		success: validForm,
		message: errorMessage
	};

}

// Prototype to check if email is valid
SubmitForm.prototype.isValidEmail = function (email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

// Prototype to check if contact number is valid
SubmitForm.prototype.isValidContactNumber = function (contact) {
	const re = /^\(?\+?\D?(\d{0,4})?\D?\D?(\d{2,3})\D?\D?(\d{3})\D?(\d{4})$/;
	return re.test(String(contact).toLowerCase());
}

// Prototype to check if number is valid
SubmitForm.prototype.isValidNumber = function (number) {
	const re = /[0-9]/;
	return re.test(String(number).toLowerCase());
}

// Prototype to check if text is valid
SubmitForm.prototype.isValidText = function (number) {
	const re = /[A-Za-z0-9\'\.\,\-\_\/\\\(\)]/;
	return re.test(String(number).toLowerCase());
}

// Function to submit a normal form with callbacks
SubmitForm.prototype.submitForm = function () {
	var self = this;
	var selector = self.selector;
	var validForm = self.validForm();

	if (validForm.success) {
		self.submitBtnTxt = selector.find("[type='submit']").html();
		if(typeof self.options.customLoader == "undefined"){
			selector.find("[type='submit']").html("Please Wait...");
		}else{
			selector.find("[type='submit']").html(self.options.customLoader);
		}
		if (self.method == "post") {
			$.post(self.action, selector.serialize(), function (data) {
				if (typeof self.options.onSuccess == "function")
					setTimeout(function(){
						self.options.onSuccess(selector, data);
					},1000);				
			}).fail(function () {
				if (typeof self.options.onError == "function")
					setTimeout(function(){
						self.options.onError(selector, data);
						selector.find("[type='submit']").html(self.submitBtnTxt)
					},1000);					
			});
		} else {
			$.get(self.action, function (data) {
				if (typeof self.options.onSuccess == "function")
					setTimeout(function(){
						self.options.onSuccess(selector, data);
					},1000);
			}).fail(function () {
				if (typeof self.options.onError == "function")
					setTimeout(function(){
						self.options.onError(selector, data);
						selector.find("[type='submit']").html(self.submitBtnTxt)
					},1000);
			});
		}
	} else {
		alert(validForm.message);
	}
}

// Function to submit a form with media with callbacks
SubmitForm.prototype.submitMediaForm = function () {
	var self = this;
	var selector = self.selector;
	var validForm = self.validForm();

	if (validForm.success) {
		self.submitBtnTxt = selector.find("[type='submit']").html();
		if(typeof self.options.customLoader == "undefined"){
			selector.find("[type='submit']").html("Please Wait...");
		}else{
			selector.find("[type='submit']").html(self.options.customLoader);
		}
		if (self.method == "post") {
			var data = new FormData(selector);
			$.ajax({
				url: self.action,
				data: data,
				type: 'POST',
				enctype: 'multipart/form-data',
				contentType: false,
				cache: false,
				processData: false,
				success: function (data) {
					if (typeof self.options.onSuccess == "function")
						setTimeout(function(){
							self.options.onSuccess(selector, data);
						},1000);
				},
				error: function (data) {
					if (typeof self.options.onError == "function")
						setTimeout(function(){
							self.options.onError(selector, data);
							selector.find("[type='submit']").html(self.submitBtnTxt)
						},1000);
				}
			});
		}
	} else {
		alert(validForm.message);
	}
}

// Adding the form events
SubmitForm.prototype.events = function () {
	var self = this;
	var selector = self.selector;
	$(selector).on("submit", function (event) {
		event.preventDefault();		
		switch (true) {
			case self.enctype == "application/x-www-form-urlencoded":
				self.submitForm();
				break;
			case self.enctype == "multipart/form-data":
				self.submitMediaForm();
				break;
			default:
				self.submitForm();
		}
	});
}

// Adding submitForm to JQuery
$.fn.submitForm = function (options) {
	this.submitForm = new SubmitForm(this, options);
	return this.submitForm;
}