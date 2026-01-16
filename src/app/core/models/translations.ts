export interface AppTranslations {
  common: {
    back: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    loading: string;
    success: string;
    error: string;
    ok: string;
  };
  dashboard: {
    app_name: string;
    select_customer: string;
    select_customer_desc: string;
    no_customers: string;
    add_customer: string;
    search_placeholder: string;
  };
  settings: {
    title: string;
    appearance: string;
    dark_mode: string;
    analytics: string;
    reports: string;
    reports_desc: string;
    data_management: string;
    export_backup: string;
    export_backup_desc: string;
    import_backup: string;
    import_backup_desc: string;
    danger_zone: string;
    factory_reset: string;
    factory_reset_desc: string;
    about: string;
    version: string;
    help_support: string;
    help_support_desc: string;
    footer_msg: string;
    language: string;
    language_desc: string;
    dark_mode_on: string;
    dark_mode_off: string;
    theme_system: string;
    theme_light: string;
    theme_dark: string;
    select_theme: string;
  };
  reports: {
    title: string;
    last_7_days: string;
    last_30_days: string;
    all_time: string;
    tab_summary: string;
    tab_customers: string;
    tab_trends: string;
    net_outstanding: string;
    you_will_get: string;
    you_will_give: string;
    total_transactions: string;
    active_customers: string;
    cash_flow_trend: string;
    customer_distribution: string;
    top_customers_balance: string;
    all_customers: string;
    transaction_activity: string;
    quick_insights: string;
    total_credit_given: string;
    total_debt_owed: string;
    customers_outstanding: string;
    outstanding_balance: string;
  };
  dialogs: {
    factory_reset_title: string;
    factory_reset_warning: string;
    factory_reset_backup_recommendation: string;
    backup_data: string;
    reset_everything: string;
    import_success_title: string;
    import_success_msg: string;
    no_new_data_title: string;
    no_new_data_msg: string;
    invalid_file_title: string;
    invalid_file_msg: string;
    error_parsing_title: string;
    error_parsing_msg: string;
    add_customer_title: string;
    edit_customer_title: string;
    customer_name: string;
    customer_name_placeholder: string;
    phone_number: string;
    phone_number_placeholder: string;
    add_transaction_title: string;
    edit_transaction_title: string;
    delete_transaction: string;
    you_gave: string;
    you_got: string;
    amount: string;
    date: string;
    time: string;
    note: string;
    note_placeholder: string;
  };
  ledger: {
    net_balance: string;
    you_will_get: string;
    you_will_give: string;
    customers_count: string;
    add_customer: string;
    search_placeholder: string;
    no_customers: string;
    no_customers_msg: string;
    you_gave: string;
    you_got: string;
    gave: string;
    got: string;
    edit_customer: string;
    delete_customer: string;
    no_transactions: string;
    no_details: string;
  };
}

export const EN_TRANSLATIONS: AppTranslations = {
  common: {
    back: 'Back',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    loading: 'Loading...',
    success: 'Success',
    error: 'Error',
    ok: 'OK'
  },
  dashboard: {
    app_name: 'Khatabook',
    select_customer: 'Select a Customer',
    select_customer_desc: 'Click on a customer to view their transactions.',
    no_customers: 'No customers yet',
    add_customer: 'Add one to start!',
    search_placeholder: 'Search customers...'
  },
  settings: {
    title: 'Settings',
    appearance: 'Appearance',
    dark_mode: 'Theme',
    analytics: 'Analytics',
    reports: 'Reports & Insights',
    reports_desc: 'View financial metrics and trends',
    data_management: 'Data Management',
    export_backup: 'Export Backup',
    export_backup_desc: 'Save your data to a JSON file',
    import_backup: 'Import Backup',
    import_backup_desc: 'Restore data from a JSON backup',
    danger_zone: 'Danger Zone',
    factory_reset: 'Factory Reset',
    factory_reset_desc: 'Permanently clear all data',
    about: 'About',
    version: 'Version',
    help_support: 'Help & Support',
    help_support_desc: 'Contact us for assistance',
    footer_msg: 'Made with ❤️ by Khatabook', // Updated footer_msg
    language: 'Language',
    language_desc: 'Change application language',
    dark_mode_on: 'Currently Enabled',
    dark_mode_off: 'Currently Disabled',
    theme_system: 'System Default',
    theme_light: 'Light',
    theme_dark: 'Dark',
    select_theme: 'Select Theme'
  },
  reports: {
    title: 'Reports & Insights',
    last_7_days: 'Last 7 Days',
    last_30_days: 'Last 30 Days',
    all_time: 'All Time',
    tab_summary: 'Summary',
    tab_customers: 'Customers',
    tab_trends: 'Trends',
    net_outstanding: 'Net Outstanding',
    you_will_get: 'You\'ll Get',
    you_will_give: 'You\'ll Give',
    total_transactions: 'Total Transactions',
    active_customers: 'Active Customers',
    cash_flow_trend: 'Cash Flow Trend',
    customer_distribution: 'Customer Distribution',
    top_customers_balance: 'Top Customers by Outstanding Balance',
    all_customers: 'All Customers',
    transaction_activity: 'Transaction Activity',
    quick_insights: 'Quick Insights',
    total_credit_given: 'Total credit given',
    total_debt_owed: 'Total debt owed',
    customers_outstanding: 'customers with outstanding balance',
    outstanding_balance: 'Outstanding Balance'
  },
  dialogs: {
    factory_reset_title: 'Factory Reset',
    factory_reset_warning: 'This will <strong>permanently delete</strong> all your customers and transactions. This action cannot be undone.',
    factory_reset_backup_recommendation: 'We strongly recommend backing up your data before proceeding.',
    backup_data: 'Backup Data',
    reset_everything: 'Reset Everything',
    import_success_title: 'Import Successful!',
    import_success_msg: 'Added:\n• {customers} new customer(s)\n• {transactions} new transaction(s)\n\nThe application will now reload to apply changes.',
    no_new_data_title: 'No New Data',
    no_new_data_msg: 'All items in the backup already exist in your current data.',
    invalid_file_title: 'Invalid File',
    invalid_file_msg: 'The selected file is not a valid Khatabook backup.',
    error_parsing_title: 'Error',
    error_parsing_msg: 'Failed to parse the backup file.',
    add_customer_title: 'Add New Customer',
    edit_customer_title: 'Edit Customer',
    customer_name: 'Customer Name',
    customer_name_placeholder: 'Ex. John Doe',
    phone_number: 'Phone Number (Optional)',
    phone_number_placeholder: 'Ex. 9876543210',
    add_transaction_title: 'Add Transaction',
    edit_transaction_title: 'Edit Transaction',
    delete_transaction: 'Delete Transaction',
    you_gave: 'You Gave',
    you_got: 'You Got',
    amount: 'Amount',
    date: 'Date',
    time: 'Time',
    note: 'Note (Optional)',
    note_placeholder: 'Ex. Lunch money'
  },
  ledger: {
    net_balance: 'Net Balance',
    you_will_get: 'You will get',
    you_will_give: 'You will give',
    customers_count: 'Customers',
    add_customer: '+ Add Customer',
    search_placeholder: 'Search Customer...',
    no_customers: 'No customers yet',
    no_customers_msg: 'Add one to start!',
    you_gave: 'You Gave',
    you_got: 'You Got',
    gave: 'GAVE',
    got: 'GOT',
    edit_customer: 'Edit Customer',
    delete_customer: 'Delete Customer',
    no_transactions: 'No transactions yet.',
    no_details: 'No details'
  }
};

export const HI_TRANSLATIONS: AppTranslations = {
  common: {
    back: 'वापस जाएँ',
    cancel: 'रद्द करें',
    save: 'सहेजें',
    delete: 'हटाएं',
    edit: 'संपादित करें',
    loading: 'लोड हो रहा है...',
    success: 'सफल',
    error: 'त्रुटि',
    ok: 'ठीक है'
  },
  dashboard: {
    app_name: 'खाताबुक',
    select_customer: 'एक ग्राहक चुनें',
    select_customer_desc: 'उनके लेनदेन देखने के लिए किसी ग्राहक पर क्लिक करें।',
    no_customers: 'कोई ग्राहक नहीं',
    add_customer: 'शुरू करने के लिए एक जोड़ें!',
    search_placeholder: 'ग्राहक खोजें...'
  },
  settings: {
    title: 'सेटिंग्स',
    appearance: 'दिखावट',
    dark_mode: 'थीम',
    analytics: 'एनालिटिक्स',
    reports: 'रिपोर्ट और जानकारी',
    reports_desc: 'वित्तीय मेट्रिक्स और रुझान देखें',
    data_management: 'डेटा प्रबंधन',
    export_backup: 'बैकअप निर्यात करें',
    export_backup_desc: 'अपना डेटा JSON फ़ाइल में सहेजें',
    import_backup: 'बैकअप आयात करें',
    import_backup_desc: 'JSON बैकअप से डेटा पुनर्स्थापित करें',
    danger_zone: 'खतरे का क्षेत्र',
    factory_reset: 'फैक्टरी रीसेट',
    factory_reset_desc: 'सभी डेटा स्थायी रूप से साफ़ करें',
    about: 'बारे में',
    version: 'संस्करण',
    help_support: 'सहायता और समर्थन',
    help_support_desc: 'सहायता के लिए हमसे संपर्क करें',
    footer_msg: 'छोटे व्यवसायों के लिए 💖 के साथ बनाया गया',
    language: 'भाषा',
    language_desc: 'एप्लिकेशन की भाषा बदलें',
    dark_mode_on: 'अभी चालू है',
    dark_mode_off: 'अभी बंद है',
    theme_system: 'सिस्टम डिफ़ॉल्ट',
    theme_light: 'लाइट',
    theme_dark: 'डार्क',
    select_theme: 'थीम चुनें'
  },
  reports: {
    title: 'रिपोर्ट और जानकारी',
    last_7_days: 'पिछले 7 दिन',
    last_30_days: 'पिछले 30 दिन',
    all_time: 'पूरा समय',
    tab_summary: 'सारांश',
    tab_customers: 'ग्राहक',
    tab_trends: 'रुझान',
    net_outstanding: 'कुल बकाया',
    you_will_get: 'आपको मिलेंगे',
    you_will_give: 'आपको देने हैं',
    total_transactions: 'कुल लेनदेन',
    active_customers: 'सक्रिय ग्राहक',
    cash_flow_trend: 'कैश फ्लो ट्रेंड',
    customer_distribution: 'ग्राहक वितरण',
    top_customers_balance: 'बकाया राशि वाले शीर्ष ग्राहक',
    all_customers: 'सभी ग्राहक',
    transaction_activity: 'लेनदेन गतिविधि',
    quick_insights: 'त्वरित जानकारी',
    total_credit_given: 'कुल उधार दिया',
    total_debt_owed: 'कुल ऋण लिया',
    customers_outstanding: 'ग्राहक जिन पर बकाया है',
    outstanding_balance: 'बकाया राशि'
  },
  dialogs: {
    factory_reset_title: 'फैक्टरी रीसेट',
    factory_reset_warning: 'यह आपके सभी ग्राहकों और लेनदेन को <strong>स्थायी रूप से हटा देगा</strong>। यह कार्रवाई पूर्ववत नहीं की जा सकती।',
    factory_reset_backup_recommendation: 'हम आगे बढ़ने से पहले आपके डेटा का बैकअप लेने की दृढ़ता से सलाह देते हैं।',
    backup_data: 'डेटा बैकअप लें',
    reset_everything: 'सब कुछ रीसेट करें',
    import_success_title: 'आयात सफल!',
    import_success_msg: 'जोड़ा गया:\n• {customers} नए ग्राहक\n• {transactions} नए लेनदेन\n\nपरिवर्तनों को लागू करने के लिए एप्लिकेशन अब रीलोड होगा।',
    no_new_data_title: 'कोई नया डेटा नहीं',
    no_new_data_msg: 'बैकअप में सभी आइटम पहले से ही आपके वर्तमान डेटा में मौजूद हैं।',
    invalid_file_title: 'अमान्य फ़ाइल',
    invalid_file_msg: 'चयनित फ़ाइल एक मान्य खाताबुक बैकअप नहीं है।',
    error_parsing_title: 'त्रुटि',
    error_parsing_msg: 'बैकअप फ़ाइल को पार्स करने में विफल।',
    add_customer_title: 'नया ग्राहक जोड़ें',
    edit_customer_title: 'ग्राहक संपादित करें',
    customer_name: 'ग्राहक का नाम',
    customer_name_placeholder: 'उदा. जॉन डो',
    phone_number: 'फ़ोन नंबर (वैकल्पिक)',
    phone_number_placeholder: 'उदा. 9876543210',
    add_transaction_title: 'लेनदेन जोड़ें',
    edit_transaction_title: 'लेनदेन संपादित करें',
    delete_transaction: 'लेनदेन हटाएं',
    you_gave: 'आपने दिए',
    you_got: 'आपको मिले',
    amount: 'राशि',
    date: 'तारीख',
    time: 'समय',
    note: 'नोट (वैकल्पिक)',
    note_placeholder: 'उदा. दोपहर के भोजन के पैसे'
  },
  ledger: {
    net_balance: 'नेट बैलेंस',
    you_will_get: 'आपको मिलेंगे',
    you_will_give: 'आपको देने हैं',
    customers_count: 'ग्राहक',
    add_customer: '+ ग्राहक जोड़ें',
    search_placeholder: 'ग्राहक खोजें...',
    no_customers: 'कोई ग्राहक नहीं',
    no_customers_msg: 'शुरू करने के लिए एक जोड़ें!',
    you_gave: 'आपने दिए',
    you_got: 'आपको मिले',
    gave: 'दिए',
    got: 'मिले',
    edit_customer: 'ग्राहक संपादित करें',
    delete_customer: 'ग्राहक हटाएं',
    no_transactions: 'अभी तक कोई लेनदेन नहीं।',
    no_details: 'कोई विवरण नहीं'
  }
};
