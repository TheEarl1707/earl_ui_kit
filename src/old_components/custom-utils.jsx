import { router } from '@inertiajs/react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export function showSwal() {
    MySwal.fire({
        title: 'Processing request',
        html: 'Please wait as the system processes your request',
        icon: 'info',
        showConfirmButton: false,
        allowOutsideClick: false,
        showLoaderOnConfirm: true,
        timer: 60000,
        // preConfirm: () => {
        //     return new Promise( resolve => {} ) // never-resolving promise, meaning it will never get finished
        // },
        didOpen: () => {
            MySwal.showLoading(); //This allows us to show the loading spinner until preConfirm is done, or until MySwal.close() is called;
        }
    });
}

export function showSuccessActions(title, text, prop_reload=null, route_redirect=null, timer=1500) {
	MySwal.fire({
		title: title,
		text: text,
		icon: 'success',
		timer: timer, // Show the message for x ms (default 1.5s)
		timerProgressBar: true, //Show timer bar
		showConfirmButton: false, // Do not show the Confirm button
	}).then(function() {
        if (prop_reload) {
            // prop_reload();
            router.reload({ only: ["products"] }); // Refresh only the "products" prop
        }

        //Redirect only if a destination is provided
        if (route_redirect) {
            router.get(route_redirect);
        }
	});
}

export function showError(errorThrown, jqXHR = undefined) {
    MySwal.fire({
        title: 'Error',
        text: (typeof jqXHR === "object") ? (typeof jqXHR.responseJSON !== "undefined") ? jqXHR.responseJSON.message : errorThrown : errorThrown,
        icon: 'error',
        showConfirmButton: false,
        showCloseButton: true,
    });

    // text = errorThrown;
    // if (typeof jqXHR === "object") {
    //     if (typeof jqXHR.responseJSON !== "undefined") {
    //         text = jqXHR.responseJSON.message;
    //     }
    // }
}

export const options_month = [
    {
        label: 'January',
        value: 'January'
    }, {
        label: 'February',
        value: 'February'
    }, {
        label: 'March',
        value: 'March'
    }, {
        label: 'April',
        value: 'April'
    }, {
        label: 'May',
        value: 'May'
    }, {
        label: 'June',
        value: 'June'
    }, {
        label: 'July',
        value: 'July'
    }, {
        label: 'August',
        value: 'August'
    }, {
        label: 'September',
        value: 'September'
    }, {
        label: 'October',
        value: 'October'
    }, {
        label: 'November',
        value: 'November'
    }, {
        label: 'December',
        value: 'December'
    },
];

export const options_yes_no = [
    // { label: 'Yes', value: '1' },
    // { label: 'No', value: '0' }
    { label: 'Yes', value: true },
    { label: 'No', value: false }
]

//TODO: Figure out how to make this work whem exported
export function handleChangeMultiple(field, index, value, for_remove=false) {

    const existingValues = data[field] || [];

    if (for_remove) {
        existingValues.splice(index, 1);
    } else {
        existingValues[index] = value;
    }

    setData(field, existingValues);

    if (errors[`${field}.${index}`]) {
        clearErrors(field); //! IDK if that is the actual field or we use the one above (field.index)
    }
}