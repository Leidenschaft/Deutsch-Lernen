var load_xml;
$(document).ready(function () {
    var Stichwort_input_boolean = false;
    var Pluralform_input_boolean = false;
    var GenitivSingular_input_boolean = false;
	
    var current_time = new Date();
    current_time.setDate(current_time.getDate() + 7);
    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
    function check_first_explanation() {
        // return true if the first explanation is empty
        if ($("#explanation_1").val() == '请在此输入词条的第1条汉语意思') {
            $("#errorMessage").text("请填写词条意思");
            $("#errorMessage").attr("style","display:block");
            return true;
        }
    }
    var textWidth = function (text) {
        var sensor = $('<pre>' + text + '</pre>').css({ display: 'none' });
        $('body').append(sensor);
        var width = sensor.width();
        sensor.remove();
        return width;
    };
    if (getCookie("buttonExpand") == '0') {
        $("#testFocus").html("Expand");
        $("#choicable").attr('class', 'choicable_collapse');
    }
    var userName = getCookie("userName");
    if (userName) {
        $("#UserName").find("option[value='" + userName + "']").attr("selected", "selected");
    }
    $("#password").width(10 + textWidth($("#password").val()));
    $("#password").val('');
    $('form').on('submit', function (e) {
        if (Stichwort_input_boolean) {
            $("#errorMessage").html();
            if(check_first_explanation())
                return false;
            if ($("#Pluralform").val() == '请在此输入复数')
                $("#Pluralform").val('');
            if ($("#GenitivSingular").val() == '请在此输入第二格')
                $("#GenitivSingular").val('');
            document.cookie = "userName=" + escape($("#UserName").val()) + ";expires=" + current_time.toGMTString();
            self.parent.change_editing_frame("viewing");
            self.parent.frames["right_frame"].document.getElementById("edit_btn").innerHTML = '编辑';
        }
        else {
            html_content = '';
            if (!Stichwort_input_boolean) html_content += "请填写词条名称";
            $("#errorMessage").text(html_content);
            $("#errorMessage").attr("style","display:block");
            return false;
        }
    });

    //if invoked from frameset, load the word information from right_frame code here
    load_xml = function load_xml(BrowserType, isNew) {
        //self.parent.document.getElementById("edit_render_frameset")

        var word_addr;
		var word_type;
        if (isNew) {
            word_addr = '../Wort/0.xml';//xml template
			word_type="Substantiv";
        }
        else {
            word_addr = self.parent.frames["right_frame"].location.toString();
			if(word_addr.search('V[0-9]+.xml')>0) {
				word_type="Verben"
            }
            else if (word_addr.search('A[0-9]+.xml') > 0) {
                word_type = 'Adjektiv';
            }
			else{
				word_type="Substantiv";
			}
        }

        //request for the xml
        if (BrowserType == "Chrome" || BrowserType == "IE") {

            $.ajax({
                url: word_addr,//'../Wort/1.xml',
                type: 'GET',
                dataType: 'xml',
                timeout: 1000,
                cache: false,
                error: function (xhr, status, errorThrown) {
                    alert("status: " + status + "\n errorThrown " + errorThrown);
                },
                success: function (xml) {
					word_addr = self.parent.frames["right_frame"].location.toString();
					word_addr=word_addr.substr(word_addr.indexOf('static')+6,word_addr.length);
					$("#wordAddr").val(word_addr);
					$("#isCreated").val('');
                    //alert($(xml).find("Stichwort").text());

                    //    }

                    //  else if(BrowserType == "IE") {
                    /*var originalTree = new ActiveXObject("Msxml2.DOMDocument.6.0");
                    originalTree.async = false;
                    originalTree.setProperty("ProhibitDTD", false);
                    originalTree.validateOnParse=false;
                    originalTree.load(word_addr);
    
                    if (originalTree.parseError.errorCode != 0) {
                        var myErr = originalTree.parseError;
                       alert("You have error " + myErr.reason);
                    } else {
                        var xmlObj = originalTree.documentElement.childNodes;*/
					if(word_type=='Verben') {
						$("input[name='category']").eq(1).click();
                    }
                    else if (word_type == 'Adjektiv') {
						$("input[name='category']").eq(2).click();
                    }
                    if ($(xml).find("Stichwort").attr("Audio"))
                        $("#StichwortAudio").val("true");
                    if ($(xml).find("Stichwort").attr("Bild"))
                        $("#StichwortPicture").val($(xml).find("Stichwort").attr("Bild"));
                    $("#Stichwort").val($(xml).find("Stichwort").text());
                    Stichwort_input_boolean = true;
                    //  $("#Einheit").val(xmlObj.item(1).text);
                    $("#Einheit").val($(xml).find("Einheit").text());
                    var unit = $(xml).find("Anteil").text();
                    //     $("#Anteil").find("option[selected='']").removeAttr("selected");
                    var Anteil_option = $("#Anteil").children();
                    Anteil_option.removeAttr("selected");
                    for (var i = 0; i < Anteil_option.length; i++) {
                        if (Anteil_option.eq(i).text() == unit) {
                            Anteil_option.eq(i).attr("selected", "");
                            Anteil_option.eq(i).click();
                            break;
                        } parseInt(current_input_compound_item)
                    }
					if(word_type=="Substantiv"){
                    var genus = $(xml).find("Genus").text();
                    var genus_option = $("input[name='Genus']");
                    genus_option.removeAttr("checked");
                    for (var i = 0; i < genus_option.length; i++) {
                        if (genus_option.eq(i).val() == genus) {
                            genus_option.eq(i).attr("checked", "checked");
                            genus_option.eq(i).click();
                            break;
                        }
                    }
                    $("#Pluralform").val($(xml).find("Pluralform").text());
                    Pluralform_input_boolean = true;
                    $("#GenitivSingular").val('请在此输入第二格');
                    if ($(xml).find("GenitivSingular").text().length > 1) {
                        $("#GenitivSingular").val($(xml).find("GenitivSingular").text());
                        GenitivSingular_input_boolean = true;
                    }
					}
                    //   var current_compound_item = 1;

                    current_input_compound_item = 0;
                    compound_word_group = $(xml).find("KompositaCollection").children("*");
                    //first remove the compound word group if exists any
                    //compound_word_group.length
                    while (current_compound_item > 1) {
                        $("#compound_" + current_compound_item.toString()).parent().remove();
                        current_compound_item -= 1;
                    }
                    $("#compound_1").val('请在此输入第1个合成词');
                    $("#compound_Link_1").val('');
                    for (var i = 0; i < compound_word_group.length; i++) {
                        if (compound_word_group.eq(i).text().length < 1) {
                            continue;
                        }
                        current_input_compound_item += 1;
                        $("#compound_" + current_input_compound_item.toString()).val(compound_word_group.eq(i).text());
                        if (compound_word_group.eq(i).attr("link")) {//here should look up a dic to translate the addr to wordform.
                            var word_original_form = self.parent.frames["navigation"].getWord_form(compound_word_group.eq(i).attr("link"));
                            $("#compound_Link_" + current_input_compound_item.toString()).val(word_original_form);
                        }
                        $("#show_link_compound_" + current_input_compound_item.toString()).removeAttr("disabled");
                        add_compound();

                    }
                    current_input_derivative_item = 0;
                    derivative_word_group = $(xml).find("abgeleiteteWörter").children("*");
                    while (current_derivative_item > 1) {
                        $("#derivative_" + current_derivative_item.toString()).parent().remove();
                        current_derivative_item -= 1;
                    }
                    $("#derivative_1").val('请在此输入第1个派生词');
                    $("#derivative_Link_1").val('');
                    for (var i = 0; i < derivative_word_group.length; i++) {
                        if (derivative_word_group.eq(i).text().length < 1) {
                            continue;
                        }
                        current_input_derivative_item += 1;
                        $("#derivative_" + current_input_derivative_item.toString()).val(derivative_word_group.eq(i).text());
                        category_collection = $("input[name='derivative_category_" + current_input_derivative_item.toString() + "']");
                        var txt_L = category_collection.length;
                        var txt_1 = category_collection.eq(0).attr("checked");
                        var txt_2 = category_collection.eq(1).attr("checked");
                        var txt_3 = category_collection.eq(2).attr("checked");
                        var gender_tmp = derivative_word_group.eq(i).attr("category");
                        category_collection.parent().children("input[checked='checked']").first().removeAttr("checked");
                        if (gender_tmp == 'Substantiv') { category_collection.eq(0).attr("checked", "checked"); category_collection.eq(0).click(); }
                        if (gender_tmp == 'Verben') { category_collection.eq(2).attr("checked", "checked"); category_collection.eq(2).click(); }
                        if (gender_tmp == 'Adjektiv') { category_collection.eq(1).attr("checked", "checked"); category_collection.eq(1).click(); }

                        if (derivative_word_group.eq(i).attr("link")) {
                            $("#derivative_Link_" + current_input_derivative_item.toString()).val(derivative_word_group.eq(i).attr("link"));
                        }

                        $("#show_link_derivative_" + current_input_derivative_item.toString()).removeAttr("disabled");
                        add_derivative();

                    }
                    current_input_Sym_item = 0;
                    Sym_word_group = $(xml).find("Synonymegruppe").children("*");
                    while (current_Sym_item > 1) {
                        $("#Sym_" + current_Sym_item.toString()).parent().remove();
                        current_Sym_item -= 1;
                    }
                    $("#Sym_1").val('请在此输入第1个同义词');
                    $("#Sym_Link_1").val('');
                    for (var i = 0; i < Sym_word_group.length; i++) {
                        if (Sym_word_group.eq(i).text().length < 1) {
                            continue;
                        }
                        current_input_Sym_item += 1;
                        $("#Sym_" + current_input_Sym_item.toString()).val(Sym_word_group.eq(i).text());
                        if (Sym_word_group.eq(i).attr("link")) {
                            $("#Sym_Link_" + current_input_Sym_item.toString()).val(Sym_word_group.eq(i).attr("link"));
                        }
                        $("#show_link_Sym_" + current_input_Sym_item.toString()).removeAttr("disabled");
                        add_Sym();

                    }

                    current_input_Anm_item = 0;
                    Anm_word_group = $(xml).find("Antonymegruppe").children("*");
                    while (current_Anm_item > 1) {
                        $("#Anm_" + current_Anm_item.toString()).parent().remove();
                        current_Anm_item -= 1;
                    }
                    $("#Anm_1").val('请在此输入第1个反义词');
                    $("#Anm_Link_1").val('');
                    for (var i = 0; i < Anm_word_group.length; i++) {
                        if (Anm_word_group.eq(i).text().length < 1) {
                            continue;
                        }
                        current_input_Anm_item += 1;
                        $("#Anm_" + current_input_Anm_item.toString()).val(Anm_word_group.eq(i).text());
                        if (Anm_word_group.eq(i).attr("link")) {
                            $("#Anm_Link_" + current_input_Anm_item.toString()).val(Anm_word_group.eq(i).attr("link"));
                        }
                        $("#show_link_Anm_" + current_input_Anm_item.toString()).removeAttr("disabled");
                        add_Anm();

                    }
                    current_input_collocation_item = 0;
                    collocation_word_group = $(xml).find("Kollokationen").children("*");
                    while (current_collocation_item > 1) {
                        $("#collocation_" + current_collocation_item.toString()).parent().remove();
                        current_collocation_item -= 1;
                    }

                    $("#collocation_1").val('请在此输入第1个短语');
                    for (var i = 0; i < collocation_word_group.length; i++) {
                        if (collocation_word_group.eq(i).text().length < 1) {
                            continue;
                        }
                        current_input_collocation_item += 1;
                        $("#collocation_" + current_input_collocation_item.toString()).val(collocation_word_group.eq(i).text());
                        var collocation_actural_width = textWidth($("#collocation_" + current_input_collocation_item.toString()).val());
                        if (collocation_actural_width > collocation_min_width)
                            $("#collocation_" + current_input_collocation_item.toString()).width(collocation_actural_width + 10);
                        add_collocation();
                    }

                    current_input_definition_item = 0;
                    Eintrag_group = $(xml).find("AllgemeineErläuterungen").children("*");//Eintrag
                    while (current_definition_item > 1) {
                        $("#explanation_" + current_definition_item.toString()).parent().next().remove();
                        $("#explanation_" + current_definition_item.toString()).parent().remove();
                        current_definition_item -= 1;//array quit stack
                        current_example_item.pop();
                        current_input_example_item.pop();
                    }
                    current_input_example_item[0] = 0;
                    while (current_example_item[0] > 1) {
                        $("#example_1_" + current_example_item[0].toString()).parent().remove();
                        current_example_item[0] -= 1;
                    }
                    for (var i = 0; i < Eintrag_group.length; i++) {
                        current_input_definition_item += 1;
                        $("#explanation_" + current_input_definition_item.toString()).val(Eintrag_group.eq(i).children("*").eq(0).text());
                        var beispielSammulung = Eintrag_group.eq(i).children("*").eq(1).children("*");
                        for (var j = 0; j < beispielSammulung.length; j++) {
                            current_input_example_item[current_input_definition_item - 1] += 2;
                            if (i > 0) add_example(current_input_definition_item);
                            $("#original_" + current_input_definition_item + "_" + current_example_item[current_input_definition_item - 1].toString()).val(beispielSammulung.eq(j).children("*").first().text());
                            $("#translation_" + current_input_definition_item + "_" + current_example_item[current_input_definition_item - 1].toString()).val(beispielSammulung.eq(j).children("*").last().text());
                            if (i == 0) add_example(current_input_definition_item);
                        }
                        add_definition();



                    }


                    // }
                }
            });

        }//this is the end of else if
    }
	$("input[name='category']").on("click",function(){
	var chosen_category=$(this).val();
	if(chosen_category!="Substantiv")
		$("#Noun_Specific").attr("style","display:none");
	else
		$("#Noun_Specific").attr("style","display:block");

		}
		);
    $("#Stichwort").on("focus", function () {
        if ($("#Stichwort").val() == '请在此输入词条的名称') {
            $("#Stichwort").val('');
            Stichwort_input_boolean = true;
        }
    });

    $("#Stichwort").on("blur", function () {
        if ($("#Stichwort").val() == '') {
            $("#Stichwort").val('请在此输入词条的名称');
            Stichwort_input_boolean = false;
        }
    });
    $("#Pluralform").on("focus", function () {
        if ($("#Pluralform").val() == '请在此输入复数') {
            $("#Pluralform").val('');
            Pluralform_input_boolean = true;
        }
    });


    $("#Pluralform").on("blur", function () {
        if ($("#Pluralform").val() == '') {
            $("#Pluralform").val('请在此输入复数');
            Pluralform_input_boolean = false;
        }
    });

    $("#Pluralform").on('input', function () {

        var entry = $("#Stichwort").val();
        if (entry == '') {
            return;
        }
        else {
            var htmlcontent = "";
            htmlcontent = htmlcontent + "<option value=\"" + entry + "\"></option>";
            htmlcontent = htmlcontent + "<option value=\"" + entry + 'en' + "\"></option>";
            htmlcontent = htmlcontent + "<option value=\"" + entry + 'e' + "\"></option>";
            htmlcontent = htmlcontent + "<option value=\"" + entry + 'n' + "\"></option>";
            htmlcontent = htmlcontent + "<option value=\"没有复数\"></option>";
            $("#Pluralform_Prompt").html(htmlcontent);
        }
    });
    $("#GenitivSingular").on("focus", function () {
        if ($("#GenitivSingular").val() == '请在此输入第二格') {
            $("#GenitivSingular").val('');
            GenitivSingular_input_boolean = true;
        }
    });

    $("#GenitivSingular").on("blur", function () {
        if ($("#GenitivSingular").val() == '') {
            $("#GenitivSingular").val('请在此输入第二格');
            GenitivSingular_input_boolean = false;
        }
    });

    $("#GenitivSingular").on('input', function () {

        var entry = $("#Stichwort").val();
        if (entry == '') {
            return;
        }
        else {
            var htmlcontent = "";
            htmlcontent = htmlcontent + "<option value=\"" + entry + "\"></option>";
            htmlcontent = htmlcontent + "<option value=\"" + entry + 'es' + "\"></option>";
            htmlcontent = htmlcontent + "<option value=\"" + entry + 's' + "\"></option>";
            $("#GenitivSingular_Prompt").html(htmlcontent);
        }
    });
    $("#testFocus").on('click', function () {
        var button_name = $("#testFocus").html();
        if (button_name == 'Expand') {
            $("#testFocus").html("Collapse");
            $("#choicable").attr('class', 'choicable_expand');
            document.cookie = "buttonExpand=1;expires=" + current_time.toGMTString();
        }
        else {
            $("#testFocus").html("Expand");
            $("#choicable").attr('class', 'choicable_collapse');
            document.cookie = "buttonExpand=0;expires=" + current_time.toGMTString();
        }
    });

    var last_tab = '1';

    $(".tab_nav_sub").on('click', function () {
        var id_tmp = this.id;
        var current_tab = id_tmp[id_tmp.length - 1];
        if (current_tab != last_tab) {
            $("#tab_nav_" + current_tab).attr("class", "tab_nav_main");
            $("#tab_nav_" + last_tab).attr("class", "tab_nav_sub");
            var tab_content_current = $("#tab_content_" + current_tab);
            tab_content_current.css("display", "block");
            var tab_content_last = $("#tab_content_" + last_tab);
            tab_content_last.css("display", "none");
            last_tab = current_tab;
        }
    });
    $("#tab_nav_" + last_tab).attr("class", "tab_nav_main");
    $("#tab_content_" + last_tab).css("display", "block");

    var current_collocation_item = 1;
    var current_input_collocation_item = 0;
    function add_collocation() {
        current_collocation_item += 1;
        new_collocation = $("<input/>", {
            "name": 'collocation_' + current_collocation_item.toString(),
            "class": "collocation",
            'value': '请在此输入第' + current_collocation_item.toString() + '个短语',
            'id': "collocation_" + current_collocation_item.toString()
        });
        new_dd = $("<dd/>");
        new_collocation.appendTo(new_dd);
        new_dd.appendTo($("#collocation_list"));
    }
    $("#edit_collocation").on('click', function () {
        if (this.innerHTML == '点击添加短语') {
            add_collocation();
            this.innerHTML = '点击移除短语';
        }
        else {
            $("#collocation_" + current_collocation_item.toString()).parent().remove();
            current_collocation_item -= 1;
            this.innerHTML = '点击添加短语';
        }
        //now change the button text to "click to remove collocation
    });
    $(document).on("blur", ".collocation", function () {
        var collocation_id = this.id;
        var collocation_id_last = collocation_id[collocation_id.length - 1];
        if (this.value == '') {
            this.value = '请在此输入第' + collocation_id_last + '个短语';
            current_input_collocation_item -= 1;
            if (current_collocation_item >= 2)
                $("#edit_collocation").text('点击移除短语');
        }
    });
    $(document).on('focus', '.collocation', function () {
        var collocation_id = this.id;
        var collocation_id_last = collocation_id[collocation_id.length - 1];
        if (this.value == ('请在此输入第' + collocation_id_last + '个短语')) {
            this.value = '';
            current_input_collocation_item += 1;
            if (current_input_collocation_item == current_collocation_item) {
                //test the "attr:disabled" exists
                //if exists then enable the edit_collocation_button
                $("#edit_collocation").removeAttr("disabled");
                $("#edit_collocation").text('点击添加短语');

            }
        }
    });



    var current_Sym_item = 1;
    var current_input_Sym_item = 0;
    function add_Sym() {
        //get the dl node and append one dd to it
        current_Sym_item += 1;
        new_Sym = $("<input/>", {
            "name": 'Sym_' + current_Sym_item.toString(),
            "class": "Sym",
            'value': '请在此输入第' + current_Sym_item.toString() + '个同义词',
            'id': "Sym_" + current_Sym_item.toString()
        });
        new_show_link_button = $("<button/>", {
            "class": 'show_link',
            "type": 'button',
            'html': '编辑超链接',
            'id': 'show_link_Sym_' + current_Sym_item.toString(),
            'disabled': ""
        });
        new_span = $("#Sym_Link_1").parent().clone();
        var new_span_children = new_span.children()
        new_span_children.first().attr('for', 'Sym_Link_' + current_Sym_item.toString());
        new_span_children.last().attr('id', 'Sym_Link_' + current_Sym_item.toString());
        new_span_children.last().attr('name', 'Sym_Link_' + current_Sym_item.toString());
        new_dd = $("<dd/>");
        new_Sym.appendTo(new_dd);
        new_show_link_button.appendTo(new_dd);
        new_dd.append($("<br/>"));
        new_span.appendTo(new_dd);
        new_dd.appendTo($("#Sym_List"));
    }
    $("#edit_Sym").on('click', function () {
        if (this.innerHTML == '点击添加同义词') {
            add_Sym();
            this.innerHTML = '点击移除同义词';
        }
        else {
            $("#Sym_" + current_Sym_item.toString()).parent().remove();
            current_Sym_item -= 1;
            this.innerHTML = '点击添加同义词';
        }
        //now change the button text to "click to remove Sym
    });
    $(document).on("blur", ".Sym", function () {
        var Sym_id = this.id;
        var Sym_id_last = Sym_id[Sym_id.length - 1];
        if (this.value == '') {
            this.value = '请在此输入第' + Sym_id_last + '个同义词';
            $("#show_link_Sym_" + Sym_id_last).attr("disabled", "");
            current_input_Sym_item -= 1;
            if (current_Sym_item >= 2)
                $("#edit_Sym").text('点击移除同义词');
        }
    });
    $(document).on('focus', '.Sym', function () {
        var Sym_id = this.id;
        var Sym_id_last = Sym_id[Sym_id.length - 1];
        if (this.value == ('请在此输入第' + Sym_id_last + '个同义词')) {
            this.value = '';
            current_input_Sym_item += 1;
            $("#show_link_Sym_" + Sym_id_last).removeAttr("disabled");
            if (current_input_Sym_item == current_Sym_item) {
                //test the "attr:disabled" exists
                //if exists then enable the edit_Sym_button
                $("#edit_Sym").removeAttr("disabled");
                $("#edit_Sym").text('点击添加同义词');

            }
        }
    });
    $(document).on('click', '.show_link', function () {
        //    var Sym_id = this.id;
        //    var Sym_id_last = Sym_id[Sym_id.length - 1];
        var input_box = $(this).parent().find('input').last();//$("#Sym_Link_"+Sym_id_last);
        if (input_box.parent().css("display") == 'none') {
            input_box.parent().css("display", "block");
            this.innerHTML = '隐藏超链接';
            input_box.prev().text('请在此输入' + $(this).parent().find('input').first().val() + '要链接到的单词');
        }
        else {
            input_box.parent().css("display", "none");
            this.innerHTML = '编辑超链接';
        }

    });
    var current_Anm_item = 1;
    var current_input_Anm_item = 0;
    function add_Anm() {
        current_Anm_item += 1;
        new_Anm = $("<input/>", {
            "name": 'Anm_' + current_Anm_item.toString(),
            "class": "Anm",
            'value': '请在此输入第' + current_Anm_item.toString() + '个反义词',
            'id': "Anm_" + current_Anm_item.toString()
        });
        new_show_link_button = $("<button/>", {
            "class": 'show_link',
            "type": 'button',
            'html': '编辑超链接',
            'id': 'show_link_Anm_' + current_Anm_item.toString(),
            'disabled': ""
        });
        new_span = $("#Anm_Link_1").parent().clone();
        var new_span_children = new_span.children()
        new_span_children.first().attr('for', 'Anm_Link_' + current_Anm_item.toString());
        new_span_children.last().attr('id', 'Anm_Link_' + current_Anm_item.toString());
        new_span_children.last().attr('name', 'Anm_Link_' + current_Anm_item.toString());
        new_dd = $("<dd/>");
        new_Anm.appendTo(new_dd);
        new_show_link_button.appendTo(new_dd);
        new_dd.append($("<br/>"));
        new_span.appendTo(new_dd);

        new_dd.appendTo($("#Anm_List"));

    }
    $("#edit_Anm").on('click', function () {
        if (this.innerHTML == '点击添加反义词') {
            add_Anm();
            this.innerHTML = '点击移除反义词';
        }
        else {
            $("#Anm_" + current_Anm_item.toString()).parent().remove();
            current_Anm_item -= 1;
            this.innerHTML = '点击添加反义词';
        }
        //now change the button text to "click to remove Anm
    });
    $(document).on("blur", ".Anm", function () {
        var Anm_id = this.id;
        var Anm_id_last = Anm_id[Anm_id.length - 1];
        if (this.value == '') {
            this.value = '请在此输入第' + Anm_id_last + '个反义词';
            $("#show_link_Anm_" + Anm_id_last).attr("disabled", "");
            current_input_Anm_item -= 1;
            if (current_Anm_item >= 2)
                $("#edit_Anm").text('点击移除反义词');
        }
    });
    $(document).on('focus', '.Anm', function () {
        var Anm_id = this.id;
        var Anm_id_last = Anm_id[Anm_id.length - 1];
        if (this.value == ('请在此输入第' + Anm_id_last + '个反义词')) {
            this.value = '';
            current_input_Anm_item += 1;
            $("#show_link_Anm_" + Anm_id_last).removeAttr("disabled");
            if (current_input_Anm_item == current_Anm_item) {
                //test the "attr:disabled" exists
                //if exists then enable the edit_Anm_button
                $("#edit_Anm").removeAttr("disabled");
                $("#edit_Anm").text('点击添加反义词');

            }
        }
    });

    var current_derivative_item = 1;
    var current_input_derivative_item = 0;
    function add_derivative() {
        //get the dl node and append one dd to it
        current_derivative_item += 1;

        new_dd = $("#derivative_1").parent().clone();
        new_dd_first_input = new_dd.children().first();
        new_dd_first_input.attr('id', 'derivative_' + current_derivative_item.toString());
        new_dd_first_input.val('请在此输入第' + current_derivative_item.toString() + '个派生词');
        new_dd_first_input.attr('name', 'derivative_' + current_derivative_item.toString());
        new_dd.children('div').find('input').attr('name', "derivative_category_" + current_derivative_item.toString());
        new_dd.children('button').attr('id', "show_link_derivative_" + current_derivative_item.toString());
        new_dd.children('span').find('label').attr('for', 'derivative_Link_' + current_derivative_item.toString());
        new_dd.children('span').find('input').attr('id', 'derivative_Link_' + current_derivative_item.toString());
        new_dd.children('span').find('input').attr('name', 'derivative_Link_' + current_derivative_item.toString());

        new_dd.appendTo($("#derivative_list"));

    }
    $("#edit_derivative").on('click', function () {
        if (this.innerHTML == '点击添加派生词') {
            add_derivative();
            this.innerHTML = '点击移除派生词';
        }
        else {
            $("#derivative_" + current_derivative_item.toString()).parent().remove();
            current_derivative_item -= 1;
            this.innerHTML = '点击添加派生词';
        }
        //now change the button text to "click to remove derivative
    });
    $(document).on("blur", ".derivative", function () {
        var derivative_id = this.id;
        var derivative_id_last = derivative_id[derivative_id.length - 1];
        if (this.value == '') {
            this.value = '请在此输入第' + derivative_id_last + '个派生词';
            $("#show_link_derivative_" + derivative_id_last).attr("disabled", "");
            current_input_derivative_item -= 1;
            if (current_derivative_item >= 2)
                $("#edit_derivative").text('点击移除派生词');
        }
    });
    $(document).on('focus', '.derivative', function () {
        var derivative_id = this.id;
        var derivative_id_last = derivative_id[derivative_id.length - 1];
        if (this.value == ('请在此输入第' + derivative_id_last + '个派生词')) {
            this.value = '';
            current_input_derivative_item += 1;
            $("#show_link_derivative_" + derivative_id_last).removeAttr("disabled");
            if (current_input_derivative_item == current_derivative_item) {
                //test the "attr:disabled" exists
                //if exists then enable the edit_derivative_button
                $("#edit_derivative").removeAttr("disabled");
                $("#edit_derivative").text('点击添加派生词');

            }
        }
    });

    var current_compound_item = 1;
    var current_input_compound_item = 0;
    function add_compound() {
        current_compound_item += 1;
        new_compound = $("<input/>", {
            "name": 'compound_' + current_compound_item.toString(),
            "class": "compound",
            'value': '请在此输入第' + current_compound_item.toString() + '个合成词',
            'id': "compound_" + current_compound_item.toString()
        });
        new_show_link_button = $("<button/>", {
            "class": 'show_link',
            "type": 'button',
            'html': '编辑超链接',
            'id': 'show_link_compound_' + current_compound_item.toString(),
            'disabled': ""
        });
        new_span = $("#compound_Link_1").parent().clone();
        var new_span_children = new_span.children()
        new_span_children.first().attr('for', 'compound_Link_' + current_compound_item.toString());
        new_span_children.last().attr('id', 'compound_Link_' + current_compound_item.toString());
        new_span_children.last().attr('name', 'compound_Link_' + current_compound_item.toString());
        new_dd = $("<dd/>");
        new_compound.appendTo(new_dd);
        new_show_link_button.appendTo(new_dd);
        new_dd.append($("<br/>"));
        new_span.appendTo(new_dd);
        new_dd.appendTo($("#compound_list"));
    }
    $("#edit_compound").on('click', function () {
        if (this.innerHTML == '点击添加合成词') {
            //get the dl node and append one dd to it
            add_compound();
            this.innerHTML = '点击移除合成词';
        }
        else {
            $("#compound_" + current_compound_item.toString()).parent().remove();
            current_compound_item -= 1;
            this.innerHTML = '点击添加合成词';
        }
        //now change the button text to "click to remove compound
    });
    $(document).on("blur", ".compound", function () {
        var compound_id = this.id;
        var compound_id_last = compound_id[compound_id.length - 1];
        if (this.value == '') {
            this.value = '请在此输入第' + compound_id_last + '个合成词';
            $("#show_link_compound_" + compound_id_last).attr("disabled", "");
            current_input_compound_item -= 1;
            if (current_compound_item >= 2)
                $("#edit_compound").text('点击移除合成词');
        }
    });
    $(document).on('focus', '.compound', function () {
        var compound_id = this.id;
        var compound_id_last = compound_id[compound_id.length - 1];
        if (this.value == ('请在此输入第' + compound_id_last + '个合成词')) {
            this.value = '';
            current_input_compound_item += 1;
            $("#show_link_compound_" + compound_id_last).removeAttr("disabled");
            if (current_input_compound_item == current_compound_item) {
                //test the "attr:disabled" exists
                //if exists then enable the edit_compound_button
                $("#edit_compound").removeAttr("disabled");
                $("#edit_compound").text('点击添加合成词');

            }
        }
    });

    var chinese_prompt_width = textWidth($("#explanation_1").val()) + 10;
    $("#explanation_1").width(chinese_prompt_width);
    var translation_prompt_width = textWidth($("#translation_1_1").val()) + 10;
    $("#translation_1_1").width(translation_prompt_width);
    $("#original_1_1").width(translation_prompt_width);
    var collocation_min_width = textWidth($("#edit_collocation"));
    var current_definition_item = 1;
    var current_input_definition_item = 0;

    //use two-dimensionary array to manage the definition
    var current_example_item = new Array;
    current_example_item.push(1);
    var current_input_example_item = new Array;
    current_input_example_item.push(0);
    $(document).on("blur", ".chinese", function () {
        var chinese_id = this.id;
        var chinese_id_last = chinese_id[chinese_id.length - 1];
        if (this.value == '') {
            this.value = '请在此输入词条的第' + chinese_id_last + '条汉语意思';
            current_input_definition_item -= 1;
            if (current_definition_item >= 2)
                $("#edit_definition").text('点击移除词的义项');
        }
    });
    $(document).on('focus', '.chinese', function () {
        var chinese_id = this.id;
        var chinese_id_last = chinese_id[chinese_id.length - 1];
        if (this.value == ('请在此输入词条的第' + chinese_id_last + '条汉语意思')) {
            this.value = '';
            current_input_definition_item += 1;
            if (current_input_definition_item == current_definition_item) {
                //test the "attr:disabled" exists
                //if exists then enable the edit_chinese_button
                $("#edit_definition").removeAttr("disabled");
                $("#edit_definition").text('点击添加词的义项');

            }
            if (current_input_example_item[parseInt(chinese_id_last) - 1] == current_example_item[parseInt(chinese_id_last) - 1] * 2 && (parseInt(chinese_id_last) == current_input_definition_item)) {
                //test the "attr:disabled" exists
                //if exists then enable the edit_translation_button
                $("#edit_example_" + chinese_id_last).removeAttr("disabled");
                $("#edit_example_" + chinese_id_last).text('点击添加例句');

            }

        }
    });
    function add_example(definition_index) {
        //get the dl node and append one dd to it
        var definition_id_last = definition_index.toString();
        current_example_item[definition_index - 1] += 1;
        new_original = $("<textarea/>", {
            "name": 'original_' + definition_id_last + '_' + current_example_item[definition_index - 1].toString(),
            "class": 'original',
            "rows": '3',
            'html': '请在此输入第' + current_example_item[definition_index - 1].toString() + '条例句',
            'id': 'original_' + definition_id_last + '_' + current_example_item[definition_index - 1].toString(),
            'width': translation_prompt_width
        });
        new_translation = $("<input/>", {
            "name": 'translation_' + definition_id_last + '_' + current_example_item[definition_index - 1].toString(),
            "class": 'translation',
            'value': '请在此输入第' + current_example_item[definition_index - 1].toString() + '条例句的汉语翻译',
            'id': 'translation_' + definition_id_last + '_' + current_example_item[definition_index - 1].toString(),
            'width': translation_prompt_width
        });
        new_example = $("<div/>", {
            "id": 'example_' + definition_id_last + '_' + current_example_item[definition_index - 1].toString()
        });
        new_example.append(new_original);
        new_example.append($("<br/>"));
        new_example.append(new_translation);
        new_dd = $("<dd/>");
        new_example.appendTo(new_dd);
        new_dd.appendTo($("#example_list_" + definition_id_last));

    }
    function add_definition() {
        current_definition_item += 1;
        new_explanation = $("<input/>", {
            "name": 'explanation_' + current_definition_item.toString(),
            "class": 'chinese',
            "rows": '3',
            'value': '请在此输入词条的第' + current_definition_item.toString() + '条汉语意思',
            'id': 'explanation_' + current_definition_item.toString(),
            'width': chinese_prompt_width
        });
        new_dt = $("<dt/>");
        new_explanation.appendTo(new_dt);
        new_dt.appendTo("#definition_list");

        new_edit_example_button = $("<button/>", {
            "class": 'definition',
            "type": 'button',
            'html': '点击添加例句',
            'id': 'edit_example_' + current_definition_item.toString(),
            'disabled': ""
        });
        new_dd = $("<dd/>");
        new_dt = $("<dt/>");
        new_dl = $("<dl/>", {
            "id": "example_list_" + current_definition_item.toString()
        });
        new_edit_example_button.appendTo(new_dt);
        new_dt.appendTo(new_dl);
        new_dl.append($("<dd/>"));
        new_dl.appendTo(new_dd);
        new_dd.appendTo("#definition_list");
        current_example_item.push(0);
        current_input_example_item.push(0);
    }
    $("#edit_definition").on('click', function () {
        if (this.innerHTML == '点击添加词的义项') {
            add_definition();
            //<button type="button" id="edit_example_1" disabled="" class="definition">点击添加例句</button>
        }

    });
    $(document).on('click', ".definition", function () {
        var definition_id = this.id;
        var definition_id_last = definition_id[definition_id.length - 1];
        var definition_index = parseInt(definition_id_last);
        if (this.innerHTML == '点击添加例句') {
            add_example(definition_index);
            this.innerHTML = '点击移除例句';
        }
        else {
            $("#example_" + definition_id_last + "_" + current_example_item[definition_index - 1].toString()).parent().remove();
            current_example_item[definition_index - 1] -= 1;
            this.innerHTML = '点击添加例句';
        }
        //now change the button text to "click to remove Anm
    });
    $(document).on("blur", ".original", function () {
        var original_id = this.id;
        var original_id_last = original_id[original_id.length - 1];
        var original_id_parent = parseInt(original_id[original_id.length - 3]);
        if (this.value == '') {
            this.value = '请在此输入第' + original_id_last + '条例句';

            current_input_example_item[original_id_parent - 1] -= 1;
            if (current_input_example_item[original_id_parent - 1] >= 2)
                $("#edit_example_1").text('点击移除例句');
        }
    });
    $(document).on("blur", ".translation", function () {
        var translation_id = this.id;
        var translation_id_last = translation_id[translation_id.length - 1];
        var translation_id_parent = parseInt(translation_id[translation_id.length - 3]);
        if (this.value == '') {
            this.value = '请在此输入第' + translation_id_last + '条例句的汉语翻译';

            current_input_example_item[translation_id_parent - 1] -= 1;
            if (current_input_example_item[translation_id_parent - 1] >= 2)
                $("#edit_example_1").text('点击移除例句');
        }
    });

    $(document).on('focus', ".original", function () {
        var original_id = this.id;
        var original_id_last = original_id[original_id.length - 1];
        var original_id_parent = parseInt(original_id[original_id.length - 3]);
        if (this.value == ('请在此输入第' + original_id_last + '条例句')) {
            this.value = '';
            current_input_example_item[original_id_parent - 1] += 1;
        }
        if (current_input_example_item[original_id_parent - 1] == current_example_item[original_id_parent - 1] * 2) {
            //test the "attr:disabled" exists && (original_id_parent == current_input_definition_item
            //if exists then enable the edit_original_button
            $("#edit_example_" + original_id_parent.toString()).removeAttr("disabled");
            $("#edit_example_" + original_id_parent.toString()).text('点击添加例句');

        }

    });
    $(document).on('focus', ".translation", function () {
        var translation_id = this.id;
        var translation_id_last = translation_id[translation_id.length - 1];
        var translation_id_parent = parseInt(translation_id[translation_id.length - 3]);
        if (this.value == ('请在此输入第' + translation_id_last + '条例句的汉语翻译')) {
            this.value = '';
            current_input_example_item[translation_id_parent - 1] += 1;
        }
        if (current_input_example_item[translation_id_parent - 1] == current_example_item[translation_id_parent - 1] * 2) {
            //test the "attr:disabled" exists && (translation_id_parent == current_input_definition_item
            //if exists then enable the edit_translation_button
            $("#edit_example_" + translation_id_parent.toString()).removeAttr("disabled");
            $("#edit_example_" + translation_id_parent.toString()).text('点击添加例句');

        }

    });



});
