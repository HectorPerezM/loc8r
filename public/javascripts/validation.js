$('#addReview').submit(function (e) {
    $('.alert.alert-danger').hide();
    if (!$('input#name').val() || !$('select#rating').val() || !$('textarea#review').val()) {
        $('.alert.alert-danger').show();
    } else {
        $(this).prepend('<div role="alert" class="alert alert-danger"> All fields required, please try again.</div>');
    }

    return false;
})