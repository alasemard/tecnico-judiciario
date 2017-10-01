$(document).ready(function(){
			
				$('#calcular').click(function (){
												
					var vbtec2017jun = {a1: 2993.62, a2: 3083.43, a3: 3175.94, a4: 3356.97, a5: 3457.68, b6: 3561.41, b7: 3668.25, b8: 3778.30, b9: 3993.66, b10: 4113.47, c11: 4236.87, c12: 4363.98, c13: 4494.90 };
					var vbtec2017nov = {a1: 3021.86, a2: 3112.52, a3: 3205.90, a4: 3388.64, a5: 3490.30, b6: 3595.01, b7: 3702.85, b8: 3813.94, b9: 4031.33, b10: 4152.27, c11: 4276.84, c12: 4405.15, c13: 4537.30 };
					var vbtec2018jun = {a1: 3050.10, a2: 3141.61, a3: 3235.86, a4: 3420.31, a5: 3522.92, b6: 3628.61, b7: 3737.46, b8: 3849.58, b9: 4069.01, b10: 4191.08, c11: 4316.81, c12: 4446.32, c13: 4579.71 };
					var vbtec2018nov = {a1: 3078.35, a2: 3170.70, a3: 3265.83, a4: 3451.98, a5: 3555.54, b6: 3662.20, b7: 3772.06, b8: 3885.23, b9: 4106.68, b10: 4229.89, c11: 4356.78, c12: 4487.49, c13: 4622.11 };
					var vbtec2019jan = {a1: 3163.07, a2: 3257.97, a3: 3355.71, a4: 3546.98, a5: 3653.40, b6: 3763.00, b7: 3875.88, b8: 3992.16, b9: 4219.71, b10: 4346.31, c11: 4476.70, c12: 4611.00, c13: 4749.33 };
					
					var funcao = {sem: 0.0, fc1: 1019.17, fc2: 1185.05, fc3: 1379.07, fc4: 1939.89, fc5: 2232.38, fc6: 3072.36};
					
					var vb = 0.0;
					var multiplcadorGaj = 0.0;	
					
					if ($("#mesAno").val() == "jun-2017"){
						vb = vbtec2017jun[$("#vencimento").val()];	
						multiplcadorGaj = 1.13;
					}else if($("#mesAno").val() == "nov-2017") {
						vb = vbtec2017nov[$("#vencimento").val()];
						multiplcadorGaj = 1.22; 
					}else if($("#mesAno").val() == "jun-2018") {
						vb = vbtec2018jun[$("#vencimento").val()];
						multiplcadorGaj = 1.25;
					}else if($("#mesAno").val() == "nov-2018") {
						vb = vbtec2018nov[$("#vencimento").val()];
						multiplcadorGaj = 1.30;
					}else if($("#mesAno").val() == "jan-2019") {
						vb = vbtec2019jan[$("#vencimento").val()];
						multiplcadorGaj = 1.40;
					}
					
					if ($("#reducao").is(":checked")){
						vb = vb - 0.25*vb;
					}
					if ($("#aq").is(":checked")){
						vb = vb + 0.05 * vb;
					}
					
					var gaj = vb * multiplcadorGaj;
					var fc = funcao[$("#fc").val()];	
					var alim = 884.0;
					var creche = 699.0;
					
					//isentosIRPF: alimentacao e creche.
					//isentosSeguridade: FC, alimentacao e creche.
					
					var irpf = 0.0;
					var seg = 0.11 * (vb + gaj);
					var somaIRPF = vb + gaj + fc - seg;
					
					if (somaIRPF <= 1903.98){
						irpf = 0.0;
					}else if ((somaIRPF > 1903.99) && (somaIRPF <= 2826.65)){
						irpf = somaIRPF * 0.075 - 142.80;
					}else if ((somaIRPF > 2826.66) && (somaIRPF <= 3751.05)){
						irpf = somaIRPF * 0.15 - 354.80;
					}else if ((somaIRPF > 3751.06) && (somaIRPF <= 4664.68)){
						irpf = somaIRPF * 0.225 - 636.13;
					}else if (somaIRPF > 4664.68){
						irpf = somaIRPF * 0.275 - 869.36;
					}
					
					var bruto = vb + gaj + fc;
					if ($("#creche").is(":checked")){
						bruto = bruto + 699.0;
					}
					if ($("#alimentacao").is(":checked")){
						bruto = bruto + 884.0;
					}
					var liquido = bruto - irpf - seg;
					var bruto_final = bruto.toFixed(2);
					var irpf_final = irpf.toFixed(2);
					var seguridade_final = seg.toFixed(2);
					var desc_final = (seg + irpf).toFixed(2);
					var liquido_final = liquido.toFixed(2);
					
					$('#bruto').text(bruto_final.replace('.',','));
					$('#irpf').text(irpf_final.replace('.',','));
					$('#seguridade').text(seguridade_final.replace('.',','));
					$('#desc').text(desc_final.replace('.',','));
					$('#liquido').text(liquido_final.replace('.',','));			
				});
			});