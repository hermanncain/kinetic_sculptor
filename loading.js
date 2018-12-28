LoadingModalDlg = function ( ) {
		
	var loadingModal = new UI.Modal();
	
	var container = loadingModal.container;
	container.setId('loadingdlg');

	var box = new UI.Panel();
	box.setId('barbox');
	container.add(box);
	
	loadingModal.bar = new UI.Panel();
	loadingModal.bar.setId('loadingbar');
	loadingModal.bar.setWidth('10%');
	box.add(loadingModal.bar);

	loadingModal.info = new UI.Text().setId('loadingInfo');
	box.add(loadingModal.info);
	    
	return loadingModal;

};